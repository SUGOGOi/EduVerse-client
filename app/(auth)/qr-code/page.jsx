"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import Image from "next/image"
import qr from "../../../public/images/qr.png"
import { useRouter } from 'next/navigation'
import Footer from "@/components/footer/Footer"

const Page = () => {
    const router = useRouter();
    const proccedHandler = () => {
        router.push("/signup")
    }

    return (
        <>
            <Navbar />
            <div className={style.container} >

                <div className={style.qr}>

                    <div className={style.form}  >
                        <h1>Payment</h1>
                        <Image src={qr} width={150} height={150} alt="" />
                        <button type="submit" className={style.btn} onClick={proccedHandler}  >Procced</button>
                    </div>
                </div>
            </div>
            <div className={style.footer}>
                <div className={style.linkContainer}>
                    <Link className={style.links} href="/login">Login</Link>
                    <Link className={style.links} href="/contact">Home</Link>
                    <Link className={style.links} href="/courses">Courses</Link>
                    <Link className={style.links} href="/about">About</Link>
                    <Link className={style.links} href="/contact">Contact</Link>
                </div>
                <h1 className={style.logoFooter}>
                    &#169; EduVerse
                </h1>
            </div>
        </>
    )
}

export default Page