"use client"
import React, { useEffect } from 'react'
import style from "./page.module.scss"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import qr from "../../public/images/qr.png"
import { useGetMyProfileQuery } from "@/redux/apis/userApi"
import { loadUserReducer } from '@/redux/reducers/userReducer'
import Navbar from '@/components/navbar/Navbar'
import { toast } from "react-hot-toast";


const Page = () => {
    const { data, isLoading, error } = useGetMyProfileQuery();
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();



    if (data) {
        toast.success(data.message)
        dispatch(loadUserReducer(data))
    }
    if (error) {
        // console.log(error)
        const err = error;
        const messageRes = err.data.error;
        toast.error(messageRes)
    }

    return (
        <>
            <Navbar />
            <div className={style.container} >
                <div className={style.profileCon}>
                    <div className={style.myDetails}>
                        <Image src={qr} alt="" width={200} height={200} />
                        <div className={style.name}></div>
                        <div className={style.email}></div>
                    </div>
                    <div className={style.myCourses}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Page