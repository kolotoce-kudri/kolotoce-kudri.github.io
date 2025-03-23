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

// Define path aliases
const PATH_ALIASES = {
    '@/': 'src/'
};

function normalizePath(filePath) {
    return filePath.split(path.sep).join(path.posix.sep);
}

function resolveAliasedPath(pathWithAlias) {
    // Check if the path starts with any of our defined aliases
    for (const [alias, value] of Object.entries(PATH_ALIASES)) {
        if (pathWithAlias.startsWith(alias)) {
            // Replace the alias with its actual path
            return pathWithAlias.replace(alias, value);
        }
    }
    // If no alias found, return the original path
    return pathWithAlias;
}

function getRelativePathWithAlias(fromPath, toPath) {
    // Get the normalized absolute paths
    const absFromPath = path.resolve(fromPath);
    const absToPath = path.resolve(toPath);
    
    // Check if toPath is in a directory that matches an alias value
    for (const [alias, value] of Object.entries(PATH_ALIASES)) {
        const aliasFullPath = path.resolve(value);
        
        // If the target path is inside the aliased directory
        if (absToPath.startsWith(aliasFullPath)) {
            // Replace the actual path with the alias
            const relativePath = absToPath.slice(aliasFullPath.length);
            // Add leading slash if it doesn't exist
            const slashedRelativePath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
            return `${alias}${slashedRelativePath.split(path.sep).join(path.posix.sep)}`;
        }
    }
    
    // If no alias applies, return regular relative path
    return normalizePath(path.relative(path.dirname(absFromPath), absToPath));
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
            console.log(content)
            let hasChanges = false;

            // Handle SVG imports and references
            const svgImportRegex = /import\s+(\w+)\s+from\s+["']([^"']+\.svg)["']/g;
            const svgUrlRegex = /url\s*\(\s*(?:["']|\${)([^"'`}]+)(?:["']|\})?\s*\)/g;

            // Replace SVG imports with picture elements
            content = content.replaceAll(svgUrlRegex, (match, svgPath) => {
                hasChanges = true;
                // Resolve alias if present
                const resolvedPath = resolveAliasedPath(svgPath);
                const importName = resolvedPath.includes(".svg") ? path.basename(resolvedPath, '.svg').replace(/[-]/g, '') : svgPath;
                return `\${get${importName}Srcset().backgroundImage}`;
            }).replace(svgImportRegex, (match, importName, svgPath) => {
                // Handle aliased paths in imports
                const resolvedPath = resolveAliasedPath(svgPath);
                
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

            // Handle aliased imports for regular images
            const imageImportRegex = /import\s+(\w+)\s+from\s+["']([^"']+\.(jpg|jpeg|png))["']/g;
            content = content.replace(imageImportRegex, (match, importName, imagePath, ext) => {
                // Check if the import uses an alias
                for (const [alias, value] of Object.entries(PATH_ALIASES)) {
                    if (imagePath.startsWith(alias)) {
                        const resolvedPath = resolveAliasedPath(imagePath);
                        const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                        hasChanges = true;
                        console.log(`Replaced aliased image import in ${filePath}: ${imagePath} → ${webpPath}`);
                        return `import ${importName} from "${webpPath}"`;
                    }
                }
                return match.replace(/\.(jpg|jpeg|png)["']$/i, '.webp"');
            });

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

                // Handle aliased paths
                for (const [alias, value] of Object.entries(PATH_ALIASES)) {
                    const normalizedValue = normalizePath(value);
                    
                    if (original.includes(normalizedValue)) {
                        // Get the part of the path after the alias value
                        const pathAfterAlias = original.split(normalizedValue)[1];
                        const aliasedPath = `${alias}${pathAfterAlias}`;
                        const webpAliasedPath = aliasedPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                        
                        // Use lookahead and lookbehind to match the exact path
                        const aliasRegex = new RegExp(`(["'\\(])${aliasedPath}\\1`, 'g');
                        
                        if (content.includes(aliasedPath)) {
                            content = content.replace(aliasRegex, (match, quote) => {
                                hasChanges = true;
                                console.log(`Replaced aliased path in ${filePath}: ${aliasedPath} → ${webpAliasedPath}`);
                                return `${quote}${webpAliasedPath}${quote}`;
                            });
                        }
                    }
                }

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
                    let absoluteMatchedPath;

                    // Check if the path has an alias
                    let hasAlias = false;
                    for (const [alias, value] of Object.entries(PATH_ALIASES)) {
                        if (matchedPath.startsWith(alias)) {
                            // Resolve the aliased path to get the actual path
                            const resolvedPath = resolveAliasedPath(matchedPath);
                            absoluteMatchedPath = path.resolve(resolvedPath);
                            hasAlias = true;
                            break;
                        }
                    }

                    // If no alias found, resolve normally
                    if (!hasAlias) {
                        absoluteMatchedPath = path.resolve(path.dirname(filePath), matchedPath);
                    }

                    if (absoluteMatchedPath === absoluteOriginalPath) {
                        let newPath;
                        
                        // If the original path had an alias, maintain the alias in the new path
                        if (hasAlias) {
                            // Find which alias was used
                            for (const [alias, value] of Object.entries(PATH_ALIASES)) {
                                if (matchedPath.startsWith(alias)) {
                                    // Get the part after the alias
                                    const pathAfterAlias = matchedPath.slice(alias.length);
                                    // Create new path with webp extension
                                    newPath = `${alias}${pathAfterAlias.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`;
                                    break;
                                }
                            }
                        } else {
                            // For non-aliased paths, check if the file is in an aliased directory
                            // and transform to use alias if appropriate
                            const possibleAliasedPath = getRelativePathWithAlias(filePath, webp);
                            
                            // If the result starts with an alias, use it; otherwise use relative path
                            if (Object.keys(PATH_ALIASES).some(alias => possibleAliasedPath.startsWith(alias))) {
                                newPath = possibleAliasedPath;
                            } else {
                                // Calculate the relative path from the source file to the webp file
                                const relativeWebPPath = path.relative(
                                    path.dirname(filePath),
                                    webp
                                ).split(path.sep).join(path.posix.sep); // Ensure forward slashes

                                // Preserve the original path style (with or without ./)
                                const leadingPath = matchedPath.startsWith('./') ? './' : '';
                                newPath = leadingPath + relativeWebPPath;
                            }
                        }
                        
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
                conversions: convertedFiles,
                aliases: PATH_ALIASES
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