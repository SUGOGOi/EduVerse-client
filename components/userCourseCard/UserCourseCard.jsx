"use Client"
import React, { useState } from 'react'
import style from "./userCouseCard.module.scss"
import { useRouter } from 'next/navigation'



const UserCourseCard = ({ id, posterUrl, subject, Class }) => {
    const router = useRouter();


    const redirectHandller = () => {
        router.push(`/course/${id}`, { scroll: false })

    }
    return (
        <div className={style.course} onClick={redirectHandller} >
            <img className={style.course_poster} src={posterUrl} alt="Course Poster" />
            <h2 className={style.course_name}>{subject}</h2>
            <h2 className={style.course_name}>Class : {Class}</h2>
        </div>
    )
}

export default UserCourseCard