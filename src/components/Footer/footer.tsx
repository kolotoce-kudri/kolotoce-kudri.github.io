export default function Footer() {
    return (
        <footer className='fixed h-[50px] w-full flex flex-row flex-wrap justify-center items-center font-semibold uppercase bg-[#0F0F0F] bottom-0 whitespace-break-spaces font-montserrat'>
            <span>Created in 2024 with </span>
            <img id="heartemoji" src="https://em-content.zobj.net/source/twitter/154/heavy-black-heart_2764.png" draggable="false" alt="heart emoji" className='h-[15px] relative animate-heart-pulse' />
            <span> by kanshen from <span className="font-bold">×</span><a className="font-bold font-uniSansCAPS" href="https://deadcode.is-a.dev">DEADCODE</a><span className="font-bold">×</span></span>
            <span> · </span>
            <span>{process.env.NODE_ENV === "production" ? (<>clone <a href="https://github.com/DeadCodeGames/ReactJSBoilerplate4GHPages">here</a> :3</>) : "Running in DEVELOPMENT MODE"}</span>
        </footer>
    )
}