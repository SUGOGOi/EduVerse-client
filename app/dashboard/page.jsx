"use client"
import React, { useEffect } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { useAllCoursesQuery } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { loadCoursesFailReducer, loadCoursesReducer } from '@/redux/reducers/courseReducer';
import Loading from '../loading';

const Page = () => {
    // Dummy data for total users and courses
    const { data, isLoading, isError, error } = useAllCoursesQuery();
    const { courses } = useSelector(state => state.courseReducer);
    console.log(courses)
    const dispatch = useDispatch();


    useEffect(() => {
        if (data) {
            // toast.success(data.message)
            dispatch(loadCoursesReducer(data))
        }
        if (error) {
            // console.log(error)
            const err = error;
            const messageRes = err.data.error;
            toast.error(messageRes)
            dispatch(loadCoursesFailReducer(err))
        }


    }, [data, error])




    return (
        <div className={style.admin_dashboard}>
            <div className={style.sidebar}>
                <h2>EduVerse Panel</h2>
                <ul>
                    <li><Link className={style.links} href={"/dashboard"} >Dashboard</Link></li>
                    <li><Link className={style.links} href={"/dashboard/users"} >Users</Link></li>
                    <li><Link className={style.links} href={"/dashboard/courses"}  >courses</Link></li>
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
                        <p>{9}</p>
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
