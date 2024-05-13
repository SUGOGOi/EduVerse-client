"use client"
import React, { useEffect, useState } from 'react'
import style from "./page.module.scss"
import { useDispatch, useSelector } from "react-redux"
import Navbar from '@/components/navbar/Navbar'
import { toast } from "react-hot-toast";
import Loading from '../loading'
import UserCourseCard from '@/components/userCourseCard/UserCourseCard'
import { useAllCoursesQuery } from '@/redux/apis/courseApi'
import { loadCoursesReducer } from '@/redux/reducers/courseReducer'
import { getMyProfile } from '@/redux/apis/userApi'


const Page = () => {
    const [loadCourseState, setLoadCourseState] = useState(1)
    const { data, isLoading, error } = useAllCoursesQuery(loadCourseState);
    const { courses } = useSelector(state => state.courseReducer);
    let { user } = useSelector(state => state.userReducer);



    // const { courses } = useSelector(state => state.courseReducer);



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
        }

    }, [data, error])


    useEffect(() => {

        if (!user) {
            dispatch(getMyProfile())
        }
    }, [user])






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
        </>
    )
}

export default Page