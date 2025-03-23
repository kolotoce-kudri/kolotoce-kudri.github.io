import { ReactSVG } from "react-svg";
import ferrisWheel from "@/images/ferrisWheel.svg";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-center bg-accent text-accentPlus selection:bg-accentPlus selection:text-accent select-none px-4 py-3">
            <div className="flex flex-row items-center gap-2">
                <ReactSVG
                    src={ferrisWheel}
                    beforeInjection={(svg) =>
                        svg.classList.add("fill-accentPlus", "w-[40px]", "h-[40px]")
                    }
                />
                <h1 className="text-2xl font-bold">Kolotoče Kudri</h1>
            </div>
        </header>
    );
}