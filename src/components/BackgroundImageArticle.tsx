import kolotocekudri from "@/images/BGImage.jpg"

export default function BackgroundImageArticle() {
    return (
        <article className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
            <img
                src={kolotocekudri}
                alt="Kolotoče Kudri"
                className="absolute inset-0 w-full h-[calc(100vh-64px)] object-cover select-none"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative z-10 flex h-[calc(100vh-64px)] flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up selection:bg-accentPlus">
                    Kolotoče Kudri
                </h1>
                <p className="text-2xl md:text-4xl animate-fade-in-up animation-delay-300 selection:bg-accent">
                    Roztočme zážitky s úsmevom
                </p>
            </div>
        </article>
    );
}

