import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "@/components/Header"
import BackgroundImageArticle from "@/components/BackgroundImageArticle"
import AboutUs from "@/components/AboutUs"
import {Helmet} from "react-helmet-async"


function App() {
    return (
        <>
           <Helmet><title>kolotoce kudri</title></Helmet><Header />
           <BackgroundImageArticle/>
           <AboutUs/>
        </>
    );
}

export default App;
