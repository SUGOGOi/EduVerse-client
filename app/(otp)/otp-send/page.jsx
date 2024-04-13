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
const Page = () => {
    const [email, setEmail] = useState("");
    const [otpSend, { isLoading }] = useOtpSendMutation();
    const router = useRouter();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email)
        const res = await otpSend({ email });

        if ("data" in res) {
            toast.success(res.data.message);
            dispatch(otpSendReducer(res.data))
            setTimeout(() => {
                router.push("/otp-verify", { scroll: false });
            }, 2000);
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error);
            dispatch(otpNotSendReducer(messageRes))
        }
    };
    return (
        <>
            <div className={style.container}>
                <Navbar />
                <div className={style.otpSend}>
                    <h1>Email Verify</h1>
                    <form action="" onSubmit={submitHandler} className={style.form}>
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
        </>
    );
};

export default Page;
