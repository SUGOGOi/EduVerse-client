"use client"
import React, { useEffect, useState } from 'react'
import style from "./page.module.scss"
import { useDispatch, useSelector } from "react-redux"
import Navbar from '@/components/navbar/Navbar'
import Loading from '../loading'
import UserCourseCard from '@/components/userCourseCard/UserCourseCard'
import { getAllCourses } from '@/redux/apis/courseApi'
import { getMyProfile } from '@/redux/apis/userApi'
import Footer from '@/components/footer/Footer'
import Cookies from 'js-cookie';
import Link from 'next/link'


const Page = () => {
    const { courses } = useSelector(state => state.courseReducer);
    let { user } = useSelector(state => state.userReducer);



    // const { courses } = useSelector(state => state.courseReducer);



    const dispatch = useDispatch();

    useEffect(() => {
        let token = Cookies.get("token")
        if (!courses) {
            // toast.success(data.message)
            dispatch(getAllCourses(token))
        }
    }, [])


    useEffect(() => {
        let token = Cookies.get("token")
        if (token) {
            if (!user) {
                dispatch(getMyProfile(token))
            }
        }
    }, [])






    return (
        <>
            <Navbar />
            <div className={style.container} >
                <h2>All courses</h2>

                {
                    courses ? (<div className={style.coursesContainer} >


                        {
                            courses.map((i, index) => (
                                <UserCourseCard key={index} id={i._id} posterUrl={`${process.env.SERVER}${i.poster}`} subject={i.subject} Class={i.class} />
                            ))
                        }
                    </div>) : (<Loading />)
                }

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