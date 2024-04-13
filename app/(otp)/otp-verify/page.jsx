"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
import { useOtpVerifyMutation } from "@/redux/apis/otpApi"
import { useDispatch, useSelector } from "react-redux"
import { clearErrorReducer, clearMessageReducer, otpNotVerifyReducer, otpVerifyReducer } from "@/redux/reducers/otpReducer"

const Page = () => {
    const [otp, setOtp] = useState("");
    const [otpVerify, { isLoading }] = useOtpVerifyMutation();
    const router = useRouter();
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.otpReducer);





    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await otpVerify({ email, otp });

        if ("data" in res) {
            toast.success(res.data.message);
            dispatch(otpVerifyReducer(res.data))
            setTimeout(() => {
                dispatch(clearMessageReducer())
                dispatch(clearErrorReducer())
                router.push("/qr-code", { scroll: false });

            }, 2000);
        } else {
            const error = res.error;
            const messageRes = error.data;
            dispatch(otpNotVerifyReducer(messageRes))
            toast.error(messageRes.error);
        }
    };
    return (
        <div className={style.container} >
            <Navbar />
            <div className={style.otpVerify}>
                <h1>OTP Verify</h1>
                <form action="" className={style.form} onSubmit={submitHandler} >
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
    )
}

export default Page