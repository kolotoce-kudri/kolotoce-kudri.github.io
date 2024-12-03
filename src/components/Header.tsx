import { ReactSVG } from 'react-svg';
import ferrisWheel from "@/images/ferrisWheel.svg"

export default function Header() {
    return (
        <div className="flex items-center gap-2 bg-accent text-accentPlus px-4 py-3">
            <ReactSVG src={ferrisWheel} beforeInjection={(svg) => svg.classList.add("fill-accentPlus", "w-[40px]", "h-[40px]")}/>
            <div className="text-2xl font-bold">Kolotoče Kudri</div>
        </div>
    );
}