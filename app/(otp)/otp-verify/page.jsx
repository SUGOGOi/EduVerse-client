"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
import { useOtpVerifyMutation } from "@/redux/apis/otpApi"
import { useDispatch, useSelector } from "react-redux"
import { clearErrorReducer, clearMessageReducer, otpNotVerifyReducer, otpVerifyReducer } from "@/redux/reducers/otpReducer"
import Footer from "@/components/footer/Footer"
import Link from "next/link"

const Page = () => {
    const [otp, setOtp] = useState("");
    const [otpVerify, { isLoading }] = useOtpVerifyMutation();
    const router = useRouter();
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.otpReducer);
    const { role } = useSelector(state => state.userReducer);





    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await otpVerify({ email, otp });

        if ("data" in res) {
            toast.success(res.data.message);
            dispatch(otpVerifyReducer(res.data))
            dispatch(clearMessageReducer())
            dispatch(clearErrorReducer())
            if (role === "teacher") {
                router.push("/signup", { scroll: false });
            } else {
                router.push("/qr-code", { scroll: false })
            }
        } else {
            const error = res.error;
            const messageRes = error.data;
            dispatch(otpNotVerifyReducer(messageRes))
            toast.error(messageRes.error);
        }
    };
    return (
        <>
            <Navbar />
            <div className={style.container} >

                <div className={style.otpVerify}>

                    <form action="" className={style.form} onSubmit={submitHandler} >
                        <h1>OTP Verify</h1>
                        <input placeholder="   XXXX" name="otp" type="text" required className={style.input} onChange={(e) => setOtp(e.target.value)} />
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
                            </div>) : (<p>Verify Otp</p>)
                        }</button>
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