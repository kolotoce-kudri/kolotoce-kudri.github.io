import Autodrom from "@/images/Autodrom_1.jpg"
import Calypso from  "@/images/Calypso_1.jpg"
import DetHyd from "@/images/Detska_hydraulika_1.jpg"
import DetRet from "@/images/Detsky_retazovy_2.jpg"
import Hrad from "@/images/Skakaci_hrad.jpg"
import Stanok from "@/images/Stanok_s_hrackami.jpg"


export default function OurAttraction(){
    return (
    <article className="bg-gray-100">
        <h1 className="text-4xl md:text-5xl text-accentPlus font-bold text-center mb-8">Naše atrakcie</h1>

        <main className="flex-1 p-4">
            <div className="flex flex-wrap gap-4 justify-around text-3xl text-accentPlus">
                <article className="attraction-card
                                    w-96 p-2 border
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={Autodrom}
                        alt="autodrom"
                        className="w-96 h-fit rounded"/>
                    <h2>Autodróm</h2>
                 </article>
                 <article className="attraction-card 
                               w-96 p-2 border
                                rounded-lg
                                text-center
                                border-accent
                                bg-accent">
                    <img 
                        src={Calypso}
                        alt="calypso"
                        className="w-96 h-fit rounded"/>
                    <h2>Calypso</h2>
                </article>
                <article className="attraction-card
                                    w-96 p-2 border
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={DetHyd}
                        alt="detska hydraulika"
                        className="w-96 h-fit rounded"/>
                    <h2>Detská hydraulika</h2>
                </article>
                <article className="attraction-card
                                    w-96 p-2 border
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={Stanok}
                        alt="stanok s hrackami"
                        className="w-96 h-fit rounded"/>
                    <h2>Stánok s hračkami</h2>
                </article>
                <article className="attraction-card
                                    w-96 p-2 border
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={Hrad}
                        alt="skakaci hrad"
                        className="w-96 h-fit rounded"/>
                    <h2>Skákací hrad</h2>
                </article>
                <article className="attraction-card
                                    w-96 p-2 border
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={DetRet}
                        alt="detsky retazak"
                        className="w-96 h-fit"/>
                    <h2>Dtský reťazový Kolotoč</h2>

                </article>
                



            </div>
        </main>
    
    </article>

    )
}