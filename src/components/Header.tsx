import { ReactSVG } from 'react-svg';
import ferrisWheel from "@/images/ferrisWheel.svg"
import { Link, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767) {
                setIsMobileMenuOpen(false)
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const menuElement = mobileMenuRef.current;

            if (
                menuElement &&
                menuElement === e.target &&
                window.getComputedStyle(menuElement, '::before').content !== 'none'
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const links = {
        "O nás": "/",
        "Kolotoče": "/kolotoce",
        "Fair Info": "/fair-info",
        "FAQ": "/faq",
        "Kontakt": "/kontakt"
    }

    return (
        <div className="flex items-center justify-between bg-accent text-accentPlus selection:bg-accentPlus selection:text-accent select-none px-4 py-3">
            <div className='flex flex-row gap-2 items-center'>
                <ReactSVG src={ferrisWheel} beforeInjection={(svg) => svg.classList.add("fill-accentPlus", "w-[40px]", "h-[40px]")} />
                <div className="text-2xl font-bold">Kolotoče Kudri</div>
            </div>
            <div className='flex flex-row gap-3 items-center mobileWrap:hidden'>
                {Object.entries(links).map(([key, value]) => (<Link to={value} key={key} className={`text-xl ${useLocation().pathname === value ? "font-bold italic" : ""}`}>{key}</Link>))}
            </div>
            <div className='group/checkbox hidden mobileWrap:flex flex-row items-center before:bg-[rgba(0,0,0,0)] has-[:checked]:before:bg-[rgba(0,0,0,0.75)] before:backgroup-blue-none has-[:checked]:before:backdrop-blur-sm before:pointer-events-none has-[:checked]:before:pointer-events-auto before:fixed before:top-0 before:left-0 before:w-[100%] before:h-[100%] before:transition-[background-color,backdrop-filter] before:duration-500 before:ease-in-out' ref={mobileMenuRef}>
                <input type="checkbox" id="mobileMenuOpen" className='hidden peer' checked={isMobileMenuOpen} onChange={(e) => setIsMobileMenuOpen(e.target.checked)} />
                <label className='material-symbols cursor-pointer' htmlFor="mobileMenuOpen">menu</label>
                <div className='flex flex-col fixed right-[-75%] transition-right duration-500 ease-in-out peer-checked:right-0 top-0 w-[75%] h-[100%] bg-accentMinus text-white selection:bg-white selection:text-accentMinus select-none font-bold p-16 pt-24 gap-y-5 *:cursor-pointer *:text-[32px] z-[1]'>
                    <label className='material-symbols fixed -right-[75%] transition-right duration-500 ease-in-out group-has-[:checked]/checkbox:right-5 top-4 h-6 w-6' htmlFor="mobileMenuOpen">close</label>
                    {Object.entries(links).map(([key, value]) => (<Link to={value} key={key} className={`leading-6 w-fit ${useLocation().pathname === value ? "font-bold italic tracking-widest" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>{key}</Link>))}
                </div>
            </div>
        </div>
    ) as React.JSX.Element
}