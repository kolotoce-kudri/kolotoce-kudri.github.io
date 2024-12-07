const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs').promises;

// Add resolutions for SVG rasterization
const SVG_RESOLUTIONS = [
    { width: 640, suffix: '-sm' },
    { width: 1024, suffix: '-md' },
    { width: 1920, suffix: '-lg' },
];

// Array to store original file paths
const originalFiles = [];
const convertedFiles = [];

const DOMAIN = 'kolotoce-kudri.github.io';

function normalizePath(filePath) {
    return filePath.split(path.sep).join(path.posix.sep);
}

async function deleteOriginalFiles() {
    console.log('\nDeleting original files...');
    for (const conversion of convertedFiles) {
        if (conversion.status === 'converted') {
            try {
                await fs.rm(conversion.original, { force: true, maxRetries: 5, retryDelay: 1000 });
                console.log(`Deleted: ${conversion.original}`);
            } catch (error) {
                console.error(`Error deleting ${conversion.original}:`, error);
            }
        } else if (conversion.status === 'skipped' || conversion.status === 'error') {
            console.log(`${conversion.original} could not be deleted - ${conversion.status === 'skipped' ? `Conversion of ${conversion.original} has been skipped.` : `There has been an error converting ${conversion.original}: ${conversion.error}`}`);
        }
    }
    console.log('Original file deletion complete!');
}

async function replaceInFiles() {
    // Find all JS, JSX, TS, TSX, CSS, SCSS, HTML files
    const codeFiles = glob.sync('**/*.{js,jsx,ts,tsx,css,scss,html}', {
        ignore: [
            'node_modules/**',
            'build/**',
            'dist/**',
            'webpify.js'
        ]
    });

    for (const filePath of codeFiles) {
        try {
            let content = await fs.readFile(filePath, 'utf8');
            let hasChanges = false;

            // Handle SVG imports and references
            const svgImportRegex = /import\s+(\w+)\s+from\s+["']([^"']+\.svg)["']/g;
            const svgUrlRegex = /url\s*\(\s*(?:["']|\${)([^"'`}]+)(?:["']|\})?\s*\)/g;

            // Replace SVG imports with picture elements
            content = content.replaceAll(svgUrlRegex, (match, svgPath) => {
                hasChanges = true;
                const importName = svgPath.includes(".svg") ? path.basename(svgPath, '.svg').replace(/[-]/g, '') : svgPath;
                return `\${get${importName}Srcset().backgroundImage}`;
            }).replace(svgImportRegex, (match, importName, svgPath) => {
                // Create imports for all resolutions
                const importLines = SVG_RESOLUTIONS.map(res => 
                    `import ${importName}${res.suffix.replace("-", "")} from "${svgPath.replace('.svg', `${res.suffix}.webp`)}"`
                ).join('\n');
                
                // Create a helper function for this component
                const helperFunction = `
const get${importName}Srcset = () => ({
    webp: \`\${${importName}sm} 640w, 
           \${${importName}md} 1024w, 
           \${${importName}lg} 1920w\`,
    fallback: ${importName}lg,
    backgroundImage: \`image-set(
        url(\${${importName}sm}) 1x,
        url(\${${importName}md}) 2x,
        url(\${${importName}lg}) 3x
    )\`
});`;
                
                hasChanges = true;
                return `${importLines}\n${helperFunction}`;
            }).replace(/<ReactSVG\s+src={([^}]+)}\s*([^/>]*)\/?>/g, (match, svgVar, props) => {
                hasChanges = true;
                return `
<picture>
    <source
        srcSet={get${svgVar}Srcset().webp}
        type="image/webp"
    />
    <img src={get${svgVar}Srcset().fallback} ${props}/>
</picture>`;
            })

            // Handle domain-based URLs first
            if (filePath === 'pre-render.js') {
                const domainPattern = new RegExp(`https?:\\/\\/${DOMAIN}\\/([^"'\\s]+)\\.(jpg|jpeg|png)`, 'gi');
                content = content.replace(domainPattern, (match, fileName, ext) => {
                    const newUrl = `https://${DOMAIN}/${fileName}.webp`;
                    console.log(`Replaced domain URL in ${filePath}: ${match} → ${newUrl}`);
                    hasChanges = true;
                    return newUrl;
                });
            }

            // Original image reference replacement logic
            for (const conversion of convertedFiles) {
                if (conversion.status === 'skipped') continue;
                const { original, webp } = conversion;
                const fileName = path.basename(original);

                if (original.includes('public/')) {
                    // Create the absolute path version (starting with /)
                    const absolutePath = `/${original.split('public/')[1]}`;
                    const absoluteWebPPath = `/${webp.split('public/')[1]}`;

                    if (content.includes('%PUBLIC_URL%')) {
                        // Handle %PUBLIC_URL% placeholder
                        const publicUrlPath = `%PUBLIC_URL%${absolutePath}`;
                        const publicUrlWebPPath = `%PUBLIC_URL%${absoluteWebPPath}`;

                        // Replace %PUBLIC_URL% paths
                        if (content.includes(publicUrlPath)) {
                            content = content.replace(new RegExp(publicUrlPath, 'g'), publicUrlWebPPath);
                            hasChanges = true;
                            console.log(`Replaced %PUBLIC_URL% reference in ${filePath}: ${publicUrlPath} → ${publicUrlWebPPath}`);
                        }
                    } else {
                        // Replace absolute path references
                        if (content.includes(absolutePath)) {
                            content = content.replace(new RegExp(absolutePath, 'g'), absoluteWebPPath);
                            hasChanges = true;
                            console.log(`Replaced absolute path reference in ${filePath}: ${absolutePath} → ${absoluteWebPPath}`);
                        }
                    }
                }

                // Original relative path handling
                const absoluteOriginalPath = path.resolve(original);
                const regex = new RegExp(`(["'\\(])([^"']*${fileName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})\\1`, 'g');
                let match;
                while ((match = regex.exec(content)) !== null) {
                    const matchedPath = match[2];
                    const absoluteMatchedPath = path.resolve(path.dirname(filePath), matchedPath);

                    if (absoluteMatchedPath === absoluteOriginalPath) {
                        // Calculate the relative path from the source file to the webp file
                        const relativeWebPPath = path.relative(
                            path.dirname(filePath),
                            webp
                        ).split(path.sep).join(path.posix.sep); // Ensure forward slashes

                        // Preserve the original path style (with or without ./)
                        const leadingPath = matchedPath.startsWith('./') ? './' : '';
                        const newPath = leadingPath + relativeWebPPath;
                        
                        content = content.replace(matchedPath, newPath);
                        hasChanges = true;
                        console.log(`Replaced reference in ${filePath}: ${matchedPath} → ${newPath}`);
                    }
                }
            }

            // Only write to file if changes were made
            if (hasChanges) {
                await fs.writeFile(filePath, content, 'utf8');
                console.log(`Updated ${filePath}`);
            }
        } catch (error) {
            console.error(`Error processing ${filePath}:`, error);
        }
    }
}

async function rasterizeSVGs() {
    console.log('\nRasterizing SVGs...');
    const svgFiles = glob.sync('**/*.svg', {
        ignore: [
            'node_modules/**',
            'build/**',
            'dist/**',
            'src/images/ferrisWheel.svg'
        ]
    }).map(normalizePath);

    for (const svgPath of svgFiles) {
        try {
            const svgBuffer = await fs.readFile(svgPath);
            
            for (const resolution of SVG_RESOLUTIONS) {
                const outputPath = svgPath.replace(/\.svg$/i, `${resolution.suffix}.webp`);

                try {
                    await fs.access(outputPath);
                    console.log(`Skipping ${outputPath} - already exists`);
                    continue;
                } catch {
                    // File doesn't exist, proceed with conversion
                }

                await sharp(svgBuffer)
                    .resize(resolution.width)
                    .webp({ quality: 90 })
                    .toFile(outputPath);

                console.log(`Rasterized: ${svgPath} → ${outputPath} (${resolution.width}px)`);

                convertedFiles.push({original: svgPath, webp: outputPath, status: 'converted'});
            }
        } catch (error) {
            console.error(`Error rasterizing ${svgPath}:`, error);
        }
    }
    console.log('SVG rasterization complete!');
}

async function convertToWebP() {
    try {
        // First rasterize SVGs
        await rasterizeSVGs();

        // Find all jpg and png files in the project
        const images = glob.sync('**/*.{jpg,jpeg,png}', {
            ignore: [
                'node_modules/**',
                'build/**',
                'dist/**',
                'src/input.css'
            ]
        }).map(normalizePath);

        console.log(`Found ${String(images.length).padStart(images.length.toString().length, '0')} images to convert.\n`, ...(images.map((image, i) => `Conversion Queue [${String(i + 1).padStart(images.length.toString().length, '0')}/${images.length}]: ${image} \n`)));

        for (const imagePath of images) {
            // Store original file path
            originalFiles.push(imagePath);

            const outputPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

            // Check if WebP version already exists
            try {
                await fs.access(outputPath);
                console.log(`Skipping ${imagePath} - WebP version already exists`);
                convertedFiles.push({
                    original: imagePath,
                    webp: outputPath,
                    status: 'skipped'
                });
                continue;
            } catch {
                // File doesn't exist, proceed with conversion
            }

            try {
                await sharp(imagePath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                convertedFiles.push({
                    original: imagePath,
                    webp: outputPath,
                    status: 'converted'
                });
                console.log(`Converted [${String(convertedFiles.length).padStart(images.length.toString().length, '0')}/${images.length}]: ${imagePath} → ${outputPath}`);
            } catch (error) {
                console.error(`Error converting ${imagePath}:`, error);
                convertedFiles.push({
                    original: imagePath,
                    webp: outputPath,
                    status: 'error',
                    error: error.message
                });
            }
        }

        // Save the results to a JSON file
        await fs.writeFile(
            'webp-conversion-results.json',
            JSON.stringify({
                originalFiles,
                conversions: convertedFiles
            }, null, 2)
        );

        console.log('Conversion complete! Results saved to webp-conversion-results.json');

        // Replace references in code files
        console.log('\nReplacing image references in code files...');
        await replaceInFiles();
        console.log('Reference replacement complete!');

        // Delete original files
        await deleteOriginalFiles();

    } catch (error) {
        console.error('Conversion failed:', error);
    }
}

// Run the conversion
convertToWebP();