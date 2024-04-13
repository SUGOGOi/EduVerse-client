"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import Image from "next/image"
import qr from "../../../public/images/qr.png"
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();
    const proccedHandler = () => {
        router.push("/signup")
    }

    return (
        <div className={style.container} >
            <Navbar />
            <div className={style.qr}>
                <h1>Payment</h1>
                <div className={style.form}  >
                    <Image src={qr} width={150} height={150} alt="" />
                    <button type="submit" className={style.btn} onClick={proccedHandler}  >Procced</button>
                </div>
            </div>
        </div>
    )
}

export default page