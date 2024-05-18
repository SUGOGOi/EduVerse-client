"use client"
import React, { useEffect, useState } from 'react'
import style from "./authMenu.module.scss"
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from "next/navigation"
import { useRouter } from 'next/navigation'
import { clearErrorReducer, clearMessageReducer, loadUserReducer, logoutFailReducer, logoutReducer, roleReducer } from '@/redux/reducers/userReducer'
import toast from 'react-hot-toast'
import { getMyProfile, useLogoutUserMutation } from '@/redux/apis/userApi'
import Cookies from 'js-cookie';




const AuthMenu = ({ isAuthOpen, setIsAuthOpen }) => {
    const [logoutUser, { }] = useLogoutUserMutation();
    const { user } = useSelector(state => state.userReducer);
    const pathname = usePathname();
    const router = useRouter();

    const dispatch = useDispatch();


    if (pathname.slice(1, 8) === "profile") {
        var path = "profile";
    }

    const goToProfile = () => {
        router.push(`/profile`, { scroll: false })
    }

    const logoutHandller = async () => {
        const res = await logoutUser();

        if ("data" in res) {
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

    const userRoleHandller = ({ role }) => {
        dispatch(roleReducer({ role }))
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
        <div className={`${style.menu} ${isAuthOpen ? style.active : null} `} >
            {
                user ? (<div className={style.ul} onClick={() => setIsAuthOpen(false)}   >
                    {
                        path ? (<div className={style.divText} onClick={logoutHandller} >
                            Logout
                        </div>) : (
                            <div className={style.divText} onClick={goToProfile} >Profile</div>)
                    }
                </div>) : (<ul>
                    <li onClick={() => setIsAuthOpen(false)} ><Link href="/login" className={style.menuText} >Login</Link></li >
                    <hr />
                    <li onClick={() => setIsAuthOpen(false)} ><Link href="/otp-send" className={style.menuText} onClick={() => userRoleHandller({ role: "teacher" })} >Signup as Teacher</Link></li>
                    <li onClick={() => setIsAuthOpen(false)} ><Link href="/otp-send" className={style.menuText} onClick={() => userRoleHandller({ role: "student" })} >Signup as Student</Link></li>

                </ul >)
            }
        </div>
    )
}

export default AuthMenu