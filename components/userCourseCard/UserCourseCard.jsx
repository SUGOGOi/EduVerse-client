"use Client"
import React from 'react'
import style from "./userCouseCard.module.scss"
import { useRouter } from 'next/navigation'
import Image from 'next/image'



const UserCourseCard = ({ id, posterUrl, subject, Class }) => {
    const router = useRouter();


    const redirectHandller = () => {
        router.push(`/course/${id}`, { scroll: false })

    }
    return (
        <div className={style.course} onClick={redirectHandller} >
            <div className={style.course_poster}><Image quality={75} priority={true} width={100} height={100} src={posterUrl} alt="" /></div>
            <h2 className={style.course_name}>{subject}</h2>
            <h2 className={style.course_name}>Class : {Class}</h2>
        </div>
    )
}

export default UserCourseCard