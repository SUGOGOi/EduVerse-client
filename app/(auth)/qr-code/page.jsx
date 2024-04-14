"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import Image from "next/image"
import qr from "../../../public/images/qr.png"
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter();
    const proccedHandler = () => {
        router.push("/signup")
    }

    return (
        <div className={style.container} >
            <Navbar />
            <div className={style.qr}>

                <div className={style.form}  >
                    <h1>Payment</h1>
                    <Image src={qr} width={150} height={150} alt="" />
                    <button type="submit" className={style.btn} onClick={proccedHandler}  >Procced</button>
                </div>
            </div>
        </div>
    )
}

export default Page