import { ReactSVG } from "react-svg"
import kolotocekudri from "@/images/BGImage.jpg"


export default function BackgroundImageArticle(){
return (
    
    <article className="background h-screen bg-cover bg-center w-full   md:w-full justify-center py-10 md:px-[450px]" style={{backgroundImage:`url("${kolotocekudri}")`}}>
        <div className="text-5xl md:text-7xl text-accentPlus">Kolotoče Kudri<div className="text-accent text-4xl md:text-6xl">Roztočme zážitky s úsmevom</div></div> 
    </article>
    
    
)
}