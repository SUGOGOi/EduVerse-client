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
            <Footer />
        </>
    )
}

export default Page