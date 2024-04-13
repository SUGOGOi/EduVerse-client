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
            <div className={style.signupCon}>
                <h1>SignUp</h1>
                <form action="" className={style.form}  >

                    <input placeholder="   name" name="name" type="text" required className={style.input} />

                    <input placeholder="   email" name="email" type="text" required className={style.input} />
                    <input placeholder="   mobile number" name="phno" type="text" required className={style.input} />
                    <input placeholder="   password" name="password" type="password" required className={style.input} />
                    <input placeholder="   confirm password" name="cpassword" type="password" required className={style.input} />

                    <select name="school" onChange={(e) => setSchool(e.target.value)} className={style.input} required>
                        <option value="">Select Your School</option>
                        <option value="DBHS">DBHS</option>
                        <option value="VKV">VKV</option>
                        <option value="JNV">JNV</option>
                        <option value="KV">KV</option>
                    </select>

                    <input type="file" required placeholder="  payment screenshot" name="file" className={style.input} />
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
                    <p>Already have an account? <br /> <Link href={"/login"} >Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Page