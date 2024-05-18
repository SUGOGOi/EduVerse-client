"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast";
import { getMyProfile } from "@/redux/apis/userApi"
import { useDispatch } from "react-redux"
import { useSendContactMessageMutation } from "@/redux/apis/otpApi"
import Footer from "@/components/footer/Footer"
import Cookies from "js-cookie"





const Page = () => {
    const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isShow, setIsShow] = useState("");


    const formClear = () => {
        setName("");
        setEmail("");
        setMessage("");
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await sendContactMessage({ name, email, message });

        if ("data" in res) {
            toast.success(res.data.message)
            formClear()
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
        }
    }

    useEffect(() => {
        let token = Cookies.get("token")
        // console.log(token)
        if (token) {
            if (!user) {
                dispatch(getMyProfile(token))
            }
        }
    }, [])



    return (
        <>
            <Navbar />
            <div className={style.container} >

                <div className={style.loginCon}>

                    <form action="" className={style.form} onSubmit={submitHandler} >
                        <h1>Contact Us</h1>
                        <input placeholder="   name" value={`${name}`} onChange={(e) => setName(e.target.value)} name="name" type="text" required className={style.input} />

                        <input placeholder="   email" value={`${email}`} onChange={(e) => setEmail(e.target.value)} name="email" type="text" required className={style.input} />

                        <textarea placeholder="   message" value={`${message}`} onChange={(e) => setMessage(e.target.value)} required name="message" className={style.inputArea} />



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
                            </div>) : (<p>Send</p>)
                        }</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page