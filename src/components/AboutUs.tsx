import kolotoc from "@/images/AboutUsImage.jpg"

export default function AboutUs() {
    return (
        <article className="bg-gray-100 py-16 px-16 md:px4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl text-accentPlus font-bold mb-8 text-center">O nás</h2>
                <div className="flex flex-col text-center md:odd:*:text-left md:even:*:text-right">
                    <div className="flex flex-col md:flex-row md:justify-between items-center gap-8">
                        <div className="md:w-2/5">
                            <p className="text-lg md:text-xl text-gray-700 mb-6">
                                Naša rodina sa venuje prevádzkovaniu atrakcií už dlhé roky.
                                Lunapark Radovana Kudriho je 5. generácia a poskytuje zábavu pre rôzne vekové kategórie hlavne na strednom a západnom slovensku.
                            </p>
                        </div>
                        <div className="md:w-2/5">
                            <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                                <img
                                    src={kolotoc}
                                    alt="Kolotoč"
                                    className="w-full md:h-[50vh] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

