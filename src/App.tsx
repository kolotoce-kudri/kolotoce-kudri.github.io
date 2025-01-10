import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "@/components/Header"
import BackgroundImageArticle from "@/components/BackgroundImageArticle"
import AboutUs from "@/components/AboutUs"
import {Helmet} from "react-helmet-async"
import OurAttraction from "./components/OurAttractions"


function App() {
    return (
        <>
           <Helmet><title>kolotocejrk.sk</title></Helmet><Header />
           <BackgroundImageArticle/>
           <AboutUs/>
           <OurAttraction/>
        </>
    );
}

export default App;
