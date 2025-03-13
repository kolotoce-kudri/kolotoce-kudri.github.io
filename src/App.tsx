import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "@/components/Header"
import BackgroundImageArticle from "@/components/BackgroundImageArticle"
import AboutUs from "@/components/AboutUs"
import { Helmet } from "react-helmet-async"
import OurAttraction from "./components/OurAttractions"
import SocialIcons from "./components/SocialIcons"
import Offer from "./components/offer"
import Footer from "./components/Footer"

export default function App() {
    return (
        <>
            <Header />
            <BackgroundImageArticle />
            <AboutUs />
            <OurAttraction />
            <SocialIcons />
            <Offer />
            <Footer />
        </>
    );
}
