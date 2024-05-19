"use client"
import React, { useEffect, useState } from 'react'
import style from "./page.module.scss"
import { useDispatch, useSelector } from "react-redux"
import Navbar from '@/components/navbar/Navbar'
import { toast } from "react-hot-toast";
import Loading from '../loading'
import Link from "next/link"
import { getMyProfile, useAddClassToTeacherMutation, useLogoutUserMutation } from '@/redux/apis/userApi'
import { clearErrorReducer, clearMessageReducer, logoutFailReducer, logoutReducer } from '@/redux/reducers/userReducer'
import { useRouter } from 'next/navigation'
export const dynamic = "force-dynamic"
import profileImage from "../../public/images/profile.jpg"
import Image from 'next/image'
import Cookies from 'js-cookie';


const Page = () => {
    let { user } = useSelector(state => state.userReducer);
    const [logoutUser, { isLoading }] = useLogoutUserMutation();
    const [addClassToTeacher, { }] = useAddClassToTeacherMutation();
    const [Class, setClass] = useState("")
    const router = useRouter();



    const dispatch = useDispatch();

    const logoutHandller = async () => {
        const res = await logoutUser();

        if ("data" in res) {
            user = undefined;
            toast.success(res.data.message)
            Cookies.remove("token")
            Cookies.remove("role")
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


    const addClassHandller = async () => {
        const res = await addClassToTeacher({ id: user._id, Class });

        if ("data" in res) {
            toast.success(res.data.message)
            setClass("")
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
            setClass("")

        }
    }



    useEffect(() => {
        let token = Cookies.get("token")
        // console.log(token)
        if (token) {
            if (!user) {
                dispatch(getMyProfile(token))
            }
        }
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
                                    <div className={style.dashBtn}  > <Link className={style.Link} href={"/dashboard/courses"}>Go to Dashboard</Link></div>
                                    <div className={style.addClass} >
                                        <input placeholder="   add class" name="class" type="number" required className={style.input} value={Class} onChange={(e) => setClass(e.target.value)} />

                                        <button
                                            type="button"
                                            className={style.AddBtn}
                                            onClick={addClassHandller}
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
                                                <p>ADD</p>
                                            )}
                                        </button>

                                    </div>



                                </>) : (<div className={style.approved}>
                                    <p>Approve : </p>
                                    {
                                        <p className={style.approveFalse} >{`${user.isApproved}`}</p>
                                    }
                                </div>))
                            }


                            <button
                                type="button"
                                className={style.logoutBtn}
                                onClick={logoutHandller}
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
                                    <p>Logout</p>
                                )}
                            </button>
                        </div>
                    </div>
                </div >) : (<Loading />)
            }
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