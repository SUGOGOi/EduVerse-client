"use client"
import React, { useEffect, useState } from 'react'
import style from "./page.module.scss"
import Navbar from '@/components/navbar/Navbar';
import { getCourseById } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from "next/navigation"
import Loading from '@/app/loading';
import { getMyProfile } from '@/redux/apis/userApi';
import dynamic from 'next/dynamic';
import UserModuleCard from '@/components/userModuleCard/UserModuleCard';
import Footer from '@/components/footer/Footer';
const Reactplayer = dynamic(() => import('../../../components/reactPlayer/ReactPlayer'), {
    ssr: false,
});

import Cookies from 'js-cookie';



const Page = () => {
    const { course } = useSelector(state => state.courseReducer);
    let { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [videoLink, setVideoLink] = useState("");



    useEffect(() => {
        let token = Cookies.get("token")
        dispatch(getCourseById({ id: pathname.split("/").pop(), token }))
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
            <div className={style.con}>
                {
                    course ? (<div className={style.conInside} >
                        <h1 className={style.h1ChapterName}>{course.subject}</h1>
                        <h1 className={style.h1ChapterName}>Class : {course.class}</h1>
                    </div>) : (<Loading />)
                }
                <div className={style.video_Playlist}>
                    <div className={style.video_container}>
                        <div className={style.main_video} >
                            <Reactplayer videosrc={`${videoLink}`} />
                        </div>

                        {
                            course ? (<p>{`${course.description}`}</p>) : (<></>)
                        }
                    </div>
                    <div className={style.playlist}>
                        <h2>Chapters</h2>

                        {
                            course ? (course.modules != 0 ? (course.modules.map((i, index) => (
                                <UserModuleCard key={index} moduleName={i.title} moduleId={i._id} setVideoLink={setVideoLink} />
                            ))) : (<h2 className={style.h2} >No Chapter found</h2>)) : (<Loading />)
                        }

                    </div>
                </div>
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