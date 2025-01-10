import { ReactSVG } from "react-svg"
import kolotoc from "@/images/AboutUsImage.jpg"



export default function AboutUs(){
    return (
        <article className="flex flex-col justify-center items-center">
            <div className="flex flex-row-reverse mobile:flex-col">
            <img  src={kolotoc} className="mx-auto" />
                <div className="flex flex-col notMobile:justify-end">
                <p className="text-6xl text-accentPlus font-bold  pb-[15px] mobile:text-center" >O nás</p>
                <p className="text-xl w-[500px] pb-[150px] mobile:text-center">
                Naša rodina sa venuje prevádzkovaniu atrakcií už dlhé roky.
                Lunapark Radovana Kudriho je 5.generácia a  poskutuje zábavu 
                pre rôzne vekové kategórie hlavne na strednom a západnom slovensku.
</p>
            </div></div>
        
        </article>
    );

}