"use client";
import Navbar from "@/components/navbar/Navbar";
import style from "./page.module.scss";
import { useState } from "react";
import { useOtpSendMutation } from "@/redux/apis/otpApi";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"
import { otpNotSendReducer, otpSendReducer } from "@/redux/reducers/otpReducer"
import validator from "validator";
import { emailReducer } from "@/redux/reducers/userReducer";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
const Page = () => {
    const [email, setEmail] = useState("");
    const [otpSend, { isLoading }] = useOtpSendMutation();
    const router = useRouter();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validator.isEmail(email)) {
            toast.error("Invalid email")
            return;
        }
        const res = await otpSend({ email });

        if ("data" in res) {
            toast.success(res.data.message);
            dispatch(otpSendReducer(res.data))
            dispatch(emailReducer({ email }))
            router.push("/otp-verify", { scroll: false });
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error);
            dispatch(otpNotSendReducer(messageRes))
            router.push("/login", { scroll: false });

        }
    };
    return (
        <>
            <Navbar />
            <div className={style.container}>

                <div className={style.otpSend}>

                    <form action="" onSubmit={submitHandler} className={style.form}>
                        <h1>Email Verify</h1>
                        <input
                            placeholder="   email"
                            name="email"
                            type="text"
                            required
                            className={style.input}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className={style.btn}>
                            {isLoading ? (
                                <div className={style.btnLoading}>
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
                                </div>
                            ) : (
                                <p>Send Otp</p>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            {/* <ToastContainer /> */}
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
    );
};

export default Page;
