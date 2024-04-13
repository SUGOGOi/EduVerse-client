"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import { useState } from "react"

const page = () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className={style.container} >
            <Navbar />
            <div className={style.otpVerify}>
                <h1>OTP Verify</h1>
                <form action="" className={style.form}  >
                    <input placeholder="   XXXX" name="otp" type="text" required className={style.input} />
                    <button type="submit" className={style.btn} >{
                        isLoading ? (<div className={style.btnLoading} >
                            <div className={style.wave}></div>
                            <div className={style.wave}></div>
                            <div className={style.wave}></div>
                            <div className={style.wave}></div>
                            <div className={style.wave}></div>
                            <div className={style.wave}></div>
                            <div className={style.wave}></div>
                            <div className={style.wave}></div>
                            <div className={style.wave}></div>
                            <div className={style.wave}></div>
                        </div>) : (<p>Send Otp</p>)
                    }</button>
                </form>
            </div>
        </div>
    )
}

export default page