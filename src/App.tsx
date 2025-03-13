import Header from "@/components/Header"
import BackgroundImageArticle from "@/components/BackgroundImageArticle"
import AboutUs from "@/components/AboutUs"
import OurAttraction from "./components/OurAttractions"
import SocialIcons from "./components/SocialIcons"
import Offer from "./components/Offer"
import Footer from "./components/Footer"

export default function App() {
    return (
        <>
            <Header />
            <SocialIcons />
            <BackgroundImageArticle />
            <div className="bg-gradient-to-t from-[#fcdfa5] via-[#fab8c1] to-pink-300">
                <AboutUs />
                <OurAttraction />
                <Offer />
            </div>
            <Footer />
        </>
    );
}
