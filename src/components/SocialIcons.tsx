export default function SocialIcons(){
    return(
        <aside>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                rel="stylesheet"/>
                
                <div className="fixed right-2.5 md:right-2 z-50 top-1/2 bottom-1/2 flex flex-col space-y-4 items-center  mix-blend-difference transition-colors duration-300">
            <a href="https://www.instagram.com/lunapark.kudri/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram  text-accent text-3xl mobile:text-2xl"></i>
            </a>
            <a href="https://www.tiktok.com/@lunapark.kudri?_t=ZN-8syvnslIFte&_r=1" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok text-accent text-3xl mobile:text-2xl"></i>
            </a>
           </div></aside>

    )
}