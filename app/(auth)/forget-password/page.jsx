"use client"
import React, { useState } from 'react'
import style from "./page.module.scss"
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { useForgetPasswordMutation } from '@/redux/apis/userApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {
    const [email, setEmail] = useState("");
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
    const router = useRouter();



    const submitHandler = async () => {

        const res = await forgetPassword({ email });

        if ("data" in res) {
            toast.success(res.data.message)
            setEmail("")
            router.push(`/login`, { scroll: false })
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
        }
    }


    return (
        <>

            <Navbar />
            <div className={style.container} >

                <div className={style.forgetCon}>
                    <h2>Forget Password?</h2>
                    <p>Enter your email to continue!</p>

                    <input required value={`${email}`} className={style.input} placeholder='  email' onChange={(e) => setEmail(e.target.value)} />

                    <button
                        type="button"
                        className={style.AddBtn}
                        onClick={submitHandler}
                    >
                        {isLoading ? (
                            <>
                                <div className={style.lds_ring}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </>
                        ) : (
                            <p>Send</p>
                        )}
                    </button>


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