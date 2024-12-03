// import { Router, Routes, Route } from "react-router-dom" - use this for different routes in your web app :3
import Hewwo from "@/components/Hewwo/hewwo";
import Structure from "@/components/Stwuctuwe/stwuctuwe";
import Tutowial from "@/components/Tutowial/tutowial";
import Footer from "@/components/Footer/footer";

function App() {
    return (
        <>
            <div id="content" className="grid grid-cols-[400px_350px_auto] grid-rows-[112.5px_440px_auto] gap-[16.7px_25px] px-[50px] py-[33.3px]">
                <div id="title" className="text-5xl row-[1] col-[1_/_3] flex flex-col justify-evenly font-consolas">
                    react ts + tw boilerplate
                    <Hewwo />
                </div>
                <Structure />
                <Tutowial />
            </div>
            <Footer />
        </>
    );
}

export default App;
