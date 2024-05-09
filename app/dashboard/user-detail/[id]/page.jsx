"use client"
import React, { useEffect } from 'react'
import style from "./page.module.scss"
import Link from 'next/link'
import { usePathname } from "next/navigation"
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@/app/loading'
import { getMyProfile, getSpecificUser, useApproveUserMutation } from '@/redux/apis/userApi'
import toast from 'react-hot-toast'


const Page = () => {
    // let { userDetail } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [approveUser, { isLoading }] = useApproveUserMutation()
    const { user, userDetail } = useSelector(state => state.userReducer);
    const userID = pathname.split("/").pop();







    const approveHandller = async ({ uid, id }) => {
        const res = await approveUser({ id, uid });
        if ("data" in res) {
            toast.success(res.data.message)
            //current specific user

        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
        }
    }

    useEffect(() => {
        dispatch(getMyProfile())
    }, [])

    useEffect(() => {
        if (user) {
            dispatch(getSpecificUser({ id: user._id, uid: userID }))
        }
    }, [user])


    return (
        <div className={style.admin_dashboard}>
            <div className={style.sidebar}>
                <h2>EduVerse Panel</h2>
                <ul>
                    <li><Link className={style.links} href={"/dashboard"} >Dashboard</Link></li>
                    <li><Link className={style.links} href={"/dashboard/users"} >Users</Link></li>
                    <li><Link className={style.links} href={"/dashboard/courses"} >courses</Link></li>
                    {/* Add more menu items as needed */}
                </ul>
            </div>
            <div className={style.main_content}>
                {/* Main content of the dashboard */}
                <nav className={style.navbar}>
                    <Link href="/profile">Profile</Link>
                    {/* Add more navbar items as needed */}
                </nav>
                <h1>User Details</h1>
                <div className={style.dashboard_container}>

                    {
                        userDetail ? (<>
                            <p>{`Id : ${userDetail._id}`}</p>
                            <p>{`Name : ${userDetail.name}`}</p>
                            <p>Approve : {userDetail.isApproved === true ? (<span className={style.approveTrue} >{`${userDetail.isApproved}`}</span>) : (<span className={style.approveFalse} >{`${userDetail.isApproved}`}</span>)}
                            </p>
                            <p>{`School : ${userDetail.school}`}</p>
                            <p>{`Role : ${userDetail.role}`}</p>
                            <p>Payment Proof : <a target='_blank' href={`${userDetail.paymentPhoto.url}`}>Link</a> </p>
                            <button type="submit" className={style.btn} onClick={() => approveHandller({ id: user._id, uid: userDetail._id })} >
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
                                    <p>Approve</p>
                                )}
                            </button>
                        </>) : (<Loading />)
                    }

                </div>
                {/* Add your dashboard components and content here */}
            </div>
        </div>

    )
}

export default Page