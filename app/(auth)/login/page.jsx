"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-hot-toast";
import { useLoginUserMutation } from "@/redux/apis/userApi"
import { useRouter } from 'next/navigation'
import { FiEye, FiEyeOff } from "react-icons/fi";
import Footer from "@/components/footer/Footer"
import Cookies from 'js-cookie';





const Page = () => {
    const [loginUser, { isLoading }] = useLoginUserMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShow, setIsShow] = useState("");
    const router = useRouter();

    const showHandler = () => {
        setIsShow(!isShow);
    }

    const submitHandler = async (e) => {

        try {
            e.preventDefault();
            const res = await loginUser({ email, password });
            if ("data" in res) {
                toast.success(res.data.message)
                const { token, role } = res.data;
                // console.log(token)
                // console.log(role)
                Cookies.set('token', token, {
                    expires: 10, // 10 day
                    secure: true, // true in production
                    sameSite: 'strict', // Helps prevent CSRF attacks
                });
                Cookies.set('role', role, {
                    expires: 10, // 10 day
                    secure: true, // true in production
                    sameSite: 'strict', // Helps prevent CSRF attacks
                });

                setEmail("")
                setPassword("")

                router.push(`/profile`, { scroll: false })


            } else {
                const error = res.error;
                const messageRes = error.data;
                toast.error(messageRes.error)

                setEmail("")
                setPassword("")

            }
        } catch (error) {
            toast.error(`Server error. Try again later`)
        }
    }



    return (
        <>
            <Navbar />
            <div className={style.container} >

                <div className={style.loginCon}>

                    <form action="" className={style.form} onSubmit={submitHandler} >
                        <h1>LogIn</h1>
                        <input placeholder="   email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" type="text" required className={style.input} />

                        <div className={style.inputPass}>
                            <input placeholder="   password" name="password" value={password} type={isShow ? "text" : "password"} required className={style.input} onChange={(e) => setPassword(e.target.value)} /> {isShow ? <FiEye onClick={showHandler} /> : <FiEyeOff onClick={showHandler} />}
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