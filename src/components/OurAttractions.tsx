import Autodrom from "@/images/Autodrom_1.jpg"
import Calypso from "@/images/Calypso_1.jpg"
import DetHyd from "@/images/Detska_hydraulika_1.jpg"
import DetRet from "@/images/Detsky_retazovy_2.jpg"
import Hrad from "@/images/Skakaci_hrad.jpg"
import Stanok from "@/images/Stanok_s_hrackami.jpg"
import Xfactor from "@/images/Xfactor_2.jpg"

function AttractionCard({ image, title }: { image: string, title: string }) {
    return (
        <article className="attraction-card">
            <img
                src={image}
                alt={title}
                className="attraction-card-image"
            />
            <h2 className="py-2">{title}</h2>
        </article>
    )
}

export default function OurAttraction() {
    return (
        <article className="text-3xl text-accentPlus text-center">
            <h1 className="text-4xl md:text-5xl text-accentPlus font-bold text-center mb-8">Naše atrakcie</h1>
            <main className="flex-1 p-7">
                <div className="flex flex-wrap gap-8 mobile:flex-col justify-around items-center justify-items-center text-accentPlus px-12">
                    <AttractionCard image={Autodrom} title="Autodróm" />
                    <AttractionCard image={Calypso} title="Calypso" />
                    <AttractionCard image={DetHyd} title="Detská hydraulika" />
                    <AttractionCard image={Stanok} title="Stánok s hračkami" />
                    <AttractionCard image={Hrad} title="Skákací hrad" />
                    <AttractionCard image={DetRet} title="Detský retiazkový kolotoč" />
                    <AttractionCard image={Xfactor} title="XFactor" />
                </div>
            </main>
            <div className="container mx-auto text-2xl text-pretty pb-16 px-16">
                <p>V ponuke máme aj skákací hrad "Harry Potter", silové automaty ako boxer, kopač a&nbsp;kladivo, stánok s&nbsp;hračkami, popcornom, cukrovinkami a&nbsp;cukrovou vatou.</p>
                <p>Je možné zabezpečiť aj ďalšie atrakcie: Bobová dráha, Loď, Veľký retiazkový kolotoč, 9D kino, Detská manéž...</p>
            </div>


        </article>

    )
}