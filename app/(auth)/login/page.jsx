"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import Link from "next/link"
import { useState } from "react"

const Page = () => {
    const [isLoading, setIsLoading] = useState();
    return (
        <div className={style.container} >
            <Navbar />
            <div className={style.loginCon}>
                <h1>LogIn</h1>
                <form action="" className={style.form}  >

                    <input placeholder="   email" name="email" type="text" required className={style.input} />

                    <input type="password" required placeholder="  password" name="password" className={style.input} />
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
                        </div>) : (<p>Login</p>)
                    }</button>
                    <p>New to EduVerse? <br /> <Link href={"/otp-send"} >SignUp</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Page