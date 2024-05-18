"use client"
import React, { useEffect } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { getAllCourses, useAllCoursesQuery } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { loadCoursesFailReducer, loadCoursesReducer } from '@/redux/reducers/courseReducer';
import Loading from '../loading';
import { getAllUsers, getMyProfile } from '@/redux/apis/userApi';
import Cookies from 'js-cookie';

const Page = () => {
    // Dummy data for total users and courses

    const { courses } = useSelector(state => state.courseReducer);
    const { user, users } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();



    useEffect(() => {

        let token = Cookies.get("token")

        if (token) {
            if (!user) {
                dispatch(getMyProfile(token))
            }
        }

        if (!courses) {
            // toast.success(data.message)
            dispatch(getAllCourses(token))
        }
    }, [])

    useEffect(() => {
        if (user) {
            dispatch(getAllUsers({ id: user._id }))
        }
    }, [user])




    return (
        <div className={style.admin_dashboard}>
            <div className={style.sidebar}>
                <h2>EduVerse Panel</h2>
                <ul>
                    <li><Link className={style.links} href={"/dashboard"} >Dashboard</Link></li>
                    <li><Link className={style.links} href={"/dashboard/users"} >Users</Link></li>
                    <li><Link className={style.links} href={"/dashboard/courses"}  >Courses</Link></li>
                    <li><Link className={style.links} href={"/dashboard/contact"} >Contact Messages</Link></li>
                    {/* Add more menu items as needed */}
                </ul>
            </div>
            <div className={style.main_content}>
                {/* Main content of the dashboard */}
                <nav className={style.navbar}>
                    <Link href="/profile">Profile</Link>
                    {/* Add more navbar items as needed */}
                </nav>
                <h1>Welcome to Admin Dashboard</h1>
                <div className={style.dashboard_card}>
                    <div className={style.card}>
                        <h2>Total Users</h2>
                        {
                            users ? (<p>{users.length}</p>) : (<Loading />)
                        }
                    </div>
                    <div className={style.card}>
                        <h2>Total Courses</h2>
                        {
                            courses ? (<p>{courses.length}</p>) : (<Loading />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
