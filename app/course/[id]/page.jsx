"use client"
import React, { useEffect, useState } from 'react'
import style from "./page.module.scss"
import Navbar from '@/components/navbar/Navbar';
import { getCourseById, useGetCourseByIdQuery } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from "next/navigation"
import Loading from '@/app/loading';
import { getMyProfile } from '@/redux/apis/userApi';
import { IoIosArrowUp } from 'react-icons/io';


const Page = () => {
    const { course } = useSelector(state => state.courseReducer);
    let { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const pathname = usePathname();



    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const playVideoHandller = (index) => {
        setCurrentVideoIndex(index);
    };


    const expandModuleHandller = () => {

    }

    useEffect(() => {
        dispatch(getCourseById(pathname.split("/").pop()))
    }, [])

    useEffect(() => {

        if (!user) {
            dispatch(getMyProfile())
        }
    }, [user])

    return (
        <>
            <Navbar />
            <div className={style.con}>
                {
                    course ? (<h2>{course.subject}</h2>) : (<Loading />)
                }
                <div className={style.video_Playlist}>
                    <div className={style.video_container}>
                        <video controls autoPlay src={`https://www.youtube.com/watch?v=_KPqk9NwaQg&list=RD_KPqk9NwaQg&start_radio=1`} className={style.main_video} />
                    </div>
                    <div className={style.playlist}>
                        <h2>Chapters</h2>
                        <ul>
                            {
                                course ? (course.modules.map((i, index) => (
                                    <li key={index} className={style.chp} onClick={expandModuleHandller}>
                                        {i.title}
                                        <div className={style.arrow}>
                                            <IoIosArrowUp size={25} />
                                        </div>
                                    </li>

                                ))) : <Loading />
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page