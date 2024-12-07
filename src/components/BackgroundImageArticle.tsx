import { ReactSVG } from "react-svg"
import kolotocekudri from "@/images/KolotoceKudriBigPicture.svg"


export default function BackgroundImageArticle(){
return (
    <>
    <article className="text-9xl" style={{ backgroundImage: `url(${kolotocekudri})` }}>
        <div>Kolotoče Kudri</div>
    </article>
    
    </>
)
}