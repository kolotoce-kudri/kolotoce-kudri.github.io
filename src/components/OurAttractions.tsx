import Autodrom from "@/images/Autodrom_1.jpg"
import Calypso from  "@/images/Calypso_1.jpg"
import DetHyd from "@/images/Detska_hydraulika_1.jpg"
import DetRet from "@/images/Detsky_retazovy_2.jpg"
import Hrad from "@/images/Skakaci_hrad.jpg"
import Stanok from "@/images/Stanok_s_hrackami.jpg"
import Xfactor from "@/images/Xfactor_2.jpg"


export default function OurAttraction(){
    return (
    <article className=" text-3xl text-accentPlus text-center mobile:bg-[#cf9fe4] mobile:bg-gradient-to-t mobile:from-[#cf9fe4]  mobile:via-[#fcdfa5] mobile:to-[#fac6b6] bg-gradient-to-t from-[#fac0f7] via-[#fbcbda] to-[#fcdfa5] ">
        <h1 className="text-4xl md:text-5xl text-accentPlus font-bold text-center mb-8">Naše atrakcie</h1>

        <main className="flex-1 p-7">
            <div className="flex flex-wrap gap-3 basis-3 xl:grid grid-cols-3 mobile:grid mobile:grid-cols-1 place-self-auto justify-around align-items-center justify-items-center text-3xl mobile:text-2xl text-accentPlus ">
                <article className="attraction-card
                                    w-96 mobile:w-80 border-0
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={Autodrom}
                        alt="autodrom"
                        className="w-96 mobile:w-80 h-96 mobile:h-80 rounded-lg object-cover"/>
                    <h2>Autodróm</h2>
                 </article>
                 <article className="attraction-card 
                                    w-96 mobile:w-80 border-0 border-b-4
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={Calypso}
                        alt="calypso"
                        className="w-96 mobile:w80 h-96 mobile:h-80 rounded-lg object-cover"/>
                    <h2>Calypso</h2>
                </article>
                <article className="attraction-card
                                    w-96 mobile:w-80 border-0 border-b-4
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={DetHyd}
                        alt="detska hydraulika"
                        className="w-96 moible:w-80 h-96 mobile:h-80 rounded-lg object-cover"/>
                    <h2>Detská hydraulika</h2>
                </article>
                <article className="attraction-card
                                    w-96 mobile:w-80 border-0 border-b-4
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={Stanok}
                        alt="stanok s hrackami"
                        className="w-96 mobile:w-80 h-96 mobile:h-80 rounded-lg object-cover"/>
                    <h2>Stánok s hračkami</h2>
                </article>
                <article className="attraction-card
                                    w-96 mobile:w-80 border-0 border-b-4
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={Hrad}
                        alt="skakaci hrad"
                        className="w-96 mobile:w-80 h-96 mobile:h-80 rounded-lg object-cover"/>
                    <h2>Skákací hrad</h2>
                </article>
                <article className="attraction-card
                                    w-96 mobile:w-80 border-0 border-b-4
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={DetRet}
                        alt="detsky retazak"
                        className="w-96 mobile:w-80 h-96 mobile:h-80 rounded-lg object-cover"/>
                    <h2>Detský retiazkový Kolotoč</h2>
                </article>
                <article className="attraction-card
                                    w-96 mobile:w-80 border-0 border-b-4
                                    rounded-lg
                                    text-center
                                    border-accent
                                    bg-accent">
                    <img 
                        src={Xfactor}
                        alt="Xfactor"
                        className="w-96 mobile:w-80 h-96 mobile:h-80 rounded-lg object-cover"/>
                    <h2>Xfactor </h2>
                </article>          
            </div>
        </main>
        <div className="container mx-auto text-pretty mobile:max-w-96 mobile:text-pretty mobile:container pb-16">
            <div>V ponuke máme aj skákací hrad "Harry Potter", silové automaty ako boxer, kopač a&nbsp;kladivo, stánok s&nbsp;hračkami, popcornom, cukrovinkami a&nbsp;cukrovou vatou.</div><br/>
            <div>Je možné zabezpečiť aj ďalšie atrakcie: Bobová dráha, Loď, Veľký retiazkový kolotoč, 9D kino, Detská manéž...</div>
        </div>

    
    </article>

    )
}