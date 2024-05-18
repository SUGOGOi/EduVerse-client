"use client";
import Navbar from "@/components/navbar/Navbar";
import style from "./page.module.scss";
import { useState } from "react";
import { useOtpSendMutation } from "@/redux/apis/otpApi";
// import { ToastContainer, toast } from "react-toastify";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux"
import { otpNotSendReducer, otpSendReducer } from "@/redux/reducers/otpReducer"
import validator from "validator";
import { emailReducer } from "@/redux/reducers/userReducer";
import Footer from "@/components/footer/Footer";
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
            <Footer />
        </>
    );
};

export default Page;
