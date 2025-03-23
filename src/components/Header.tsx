import { ReactSVG } from 'react-svg';
import ferrisWheel from "@/images/ferrisWheel.svg"

export default function Header() {
    return (
        <div className="sticky top-0 flex items-center justify-center bg-accent text-accentPlus selection:bg-accentPlus selection:text-accent select-none px-4 py-3 z-50">
            <div className='flex flex-row gap-2 items-center'>
                <ReactSVG src={ferrisWheel} beforeInjection={(svg) => svg.classList.add("fill-accentPlus", "w-[40px]", "h-[40px]")} />
                <div className="text-2xl font-bold">Kolotoče Kudri</div>
            </div>
        </div>
    )
}