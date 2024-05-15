"use client"
import React, { useEffect, useState } from 'react'
import style from "./page.module.scss"
import { useDispatch, useSelector } from "react-redux"
import Navbar from '@/components/navbar/Navbar'
import { toast } from "react-hot-toast";
import Loading from '../loading'
import Link from "next/link"
import { getMyProfile, useGetMyProfileQuery, useLogoutUserMutation } from '@/redux/apis/userApi'
import { clearErrorReducer, clearMessageReducer, loadUserReducer, logoutFailReducer, logoutReducer } from '@/redux/reducers/userReducer'
import { useRouter } from 'next/navigation'
export const dynamic = "force-dynamic"
import profileImage from "../../public/images/profile.jpg"
import Image from 'next/image'
import Footer from '@/components/footer/Footer'

const Page = () => {
    let { user } = useSelector(state => state.userReducer);
    const [logoutUser, { }] = useLogoutUserMutation();
    const router = useRouter();



    const dispatch = useDispatch();

    const logoutHandller = async () => {
        const res = await logoutUser();

        if ("data" in res) {
            user = undefined;
            toast.success(res.data.message)
            dispatch(logoutReducer())
            router.push('/', { scroll: false })
            dispatch(clearMessageReducer())


        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
            dispatch(logoutFailReducer(messageRes));
            dispatch(clearErrorReducer())
        }
    }



    useEffect(() => {
        dispatch(getMyProfile())

    }, [])


    return (
        <>
            <Navbar />

            {
                user ? (<div className={style.container} >
                    <div className={style.profileCon}>
                        <div className={style.myDetails}>
                            {
                                user.avatar ? (<> <Image quality={75} priority={true} src={`${user.avatar}`} alt='' className={style.image} /></>) : (<> <Image priority={true} quality={75} src={profileImage} alt='' className={style.image} /></>)
                            }
                            <div className={style.name}>{`${user.name}`}</div>
                            <div className={style.email}>{`${user.email}`}</div>
                            {
                                user.role === "admin" ? (<div className={style.dashBtn}  >
                                    <Link className={style.Link} href={"/dashboard"}>Go to Dashboard</Link>
                                </div>) : (user.role === "teacher" && user.isApproved === true ? (<>
                                    <div className={style.approved}>
                                        <p>Approve : </p>
                                        <p className={style.approveTrue} >{`${user.isApproved}`}</p>
                                    </div>
                                    <div className={style.dashBtn}  > <Link className={style.Link} href={"/dashboard/courses"}>Go to Dashboard</Link></div></>) : (<div className={style.approved}>
                                        <p>Approve : </p>
                                        {
                                            <p className={style.approveFalse} >{`${user.isApproved}`}</p>
                                        }
                                    </div>))
                            }

                            <button onClick={logoutHandller} className={style.logoutBtn} >Logout</button>
                        </div>
                    </div>
                </div >) : (<Loading />)
            }
            <Footer />
        </>
    )
}

export default Page