"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import Link from "next/link"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast";
import { useLoginUserMutation } from "@/redux/apis/userApi"
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux"
import { clearMessageReducer, loadUserReducer } from "@/redux/reducers/userReducer"
import { FiEye, FiEyeOff } from "react-icons/fi";
import Footer from "@/components/footer/Footer"
import Cookies from 'js-cookie';





const Page = () => {
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShow, setIsShow] = useState("");
    const router = useRouter();




    const showHandler = () => {
        setIsShow(!isShow);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await loginUser({ email, password });

        if ("data" in res) {
            toast.success(res.data.message)
            const { token, role } = res.data;
            console.log(token)
            console.log(role)
            Cookies.set('token', token, {
                expires: 10, // 1 day
                secure: true, // true in production
                sameSite: 'strict', // Helps prevent CSRF attacks
            });
            Cookies.set('role', role, {
                expires: 10, // 1 day
                secure: true, // true in production
                sameSite: 'strict', // Helps prevent CSRF attacks
            });

            router.push(`/profile`, { scroll: false })


        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
            // dispatch(registerFailReducer(messageRes));
            // dispatch(clearErrorReducer())
        }
    }



    return (
        <>
            <Navbar />
            <div className={style.container} >

                <div className={style.loginCon}>

                    <form action="" className={style.form} onSubmit={submitHandler} >
                        <h1>LogIn</h1>
                        <input placeholder="   email" onChange={(e) => setEmail(e.target.value)} name="email" type="text" required className={style.input} />

                        <div className={style.inputPass}>
                            <input placeholder="   password" name="password" type={isShow ? "text" : "password"} required className={style.input} onChange={(e) => setPassword(e.target.value)} /> {isShow ? <FiEye onClick={showHandler} /> : <FiEyeOff onClick={showHandler} />}
                        </div>

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
                        <p><br /> <Link href={"/forget-password"} >Forget password?</Link></p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page