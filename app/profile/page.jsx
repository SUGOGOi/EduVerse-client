"use client"
import React, { useEffect } from 'react'
import style from "./page.module.scss"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import qr from "../../public/images/qr.png"
import { useGetMyProfileQuery } from "@/redux/apis/userApi"
import { loadUserReducer } from '@/redux/reducers/userReducer'

const Page = () => {
    const { data, isLoading } = useGetMyProfileQuery();
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();


    console.log(user)

    useEffect(() => {
        if (data) {
            dispatch(loadUserReducer(data))
        }
    }, [data])



    return (
        <div className={style.container} >
            <div className={style.myDetails}>
                <Image src={qr} alt="" width={200} height={200} />
                <div className={style.name}></div>
                <div className={style.email}></div>
            </div>
            <div className={style.myCourses}></div>
        </div>
    )
}

export default Page