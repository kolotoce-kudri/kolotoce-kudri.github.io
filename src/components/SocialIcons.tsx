export default function SocialIcons() {
    return (
        <aside>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <div className="fixed right-4 md:right-7 z-50 top-1/2 bottom-1/2 flex flex-col space-y-4 items-center mix-blend-difference transition-colors duration-300">
                <a href="https://www.instagram.com/kudri.lunapark/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram text-accent text-3xl mobile:text-2xl" />
                </a>
                <a href="https://www.tiktok.com/@lunapark.kudri" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-tiktok text-accent text-3xl mobile:text-2xl" />
                </a>
            </div>
        </aside>
    )
}