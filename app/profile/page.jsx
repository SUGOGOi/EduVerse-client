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
import Cookies from 'js-cookie';


const Page = () => {
    let { user } = useSelector(state => state.userReducer);
    const [logoutUser, { isLoading }] = useLogoutUserMutation();
    const [Class, setClass] = useState("")
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
        let token = Cookies.get("token")
        // console.log(token)
        dispatch(getMyProfile(token))

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
                                        <input placeholder="   add class" name="class" type="text" required className={style.input} onChange={(e) => setClass(e.target.value)} />

                                        <button
                                            type="button"
                                            className={style.AddBtn}
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
            <Footer />
        </>
    )
}

export default Page