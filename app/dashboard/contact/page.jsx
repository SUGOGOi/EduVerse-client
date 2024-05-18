"use client"
import React, { useEffect } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/app/loading';
import { getMyProfile } from '@/redux/apis/userApi';
import { getAllCOntactMessages } from '@/redux/apis/otpApi';
import ContactMessageCard from '@/components/contactMessageCard/ContactMessageCard';
import Cookies from 'js-cookie';



const Page = () => {
    const { messages } = useSelector(state => state.otpReducer)
    const { user } = useSelector(state => state.userReducer);
    // console.log(user)

    const dispatch = useDispatch("");

    useEffect(() => {

        let token = Cookies.get("token")

        if (token) {
            if (!user) {
                dispatch(getMyProfile(token))
            }
        }
    }, [])

    useEffect(() => {
        if (user) {
            dispatch(getAllCOntactMessages({ id: user._id }))
        }
    }, [user])

    return (
        <>
            <div className={style.admin_dashboard}>
                <div className={style.sidebar}>
                    <h2>EduVerse Panel</h2>
                    <ul>
                        {
                            user && user.role === "teacher" ? (<>
                                <li><Link className={style.links} href={"/dashboard/users"} >Students</Link></li>
                                <li><Link className={style.links} href={"/dashboard/courses"} >Courses</Link></li>
                            </>) : (
                                user && user.role === "admin" ? (<><li><Link className={style.links} href={"/dashboard"} >Dashboard</Link></li>
                                    <li><Link className={style.links} href={"/dashboard/users"} >Users</Link></li>
                                    <li><Link className={style.links} href={"/dashboard/courses"} >Courses</Link></li>
                                    <li><Link className={style.links} href={"/dashboard/contact"} >Contact Messagses</Link></li>


                                </>) : (<></>)
                            )
                        }

                        {/* Add more menu items as needed */}
                    </ul>
                </div>
                <div className={style.main_content}>
                    {/* Main content of the dashboard */}
                    <nav className={style.navbar}>
                        <Link href="/profile">Profile</Link>
                        {/* Add more navbar items as needed */}
                    </nav>
                    <div className={style.heading}>
                        <h1>Contact Messages</h1>
                    </div>

                    <div className={style.dashboard_card}>
                        {
                            messages ? messages.map((i, index) => (
                                <ContactMessageCard key={index} name={i.userName} email={i.email} message={i.message} />

                            )) : (<Loading />)
                        }
                    </div>
                    {/* Add your dashboard components and content here */}
                </div>
            </div>
            {/* <Footer /> */}


        </>
    );
}

export default Page;
