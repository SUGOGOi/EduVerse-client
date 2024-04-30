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
import Loading from '../loading'


const Page = () => {
    const { data, isLoading, error } = useGetMyProfileQuery();
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();


    if (user) {
        var url = user.paymentPhoto.url;

    }



    useEffect(() => {
        if (document.cookie) {
            if (data) {
                // toast.success(data.message)
                dispatch(loadUserReducer(data))
            }

            if (error) {
                // console.log(error)
                const err = error;
                const messageRes = err.data.error;
                toast.error(messageRes)
            }
        }

    }, [data, error])



    return (
        <>
            <Navbar />
            {
                user ? (<div className={style.container} >
                    <div className={style.profileCon}>
                        <div className={style.myDetails}>
                            <img src={url} alt='' className={style.image} />
                            <div className={style.name}>{`${user.name}`}</div>
                            <div className={style.email}>{`${user.email}`}</div>
                            <div className={style.approved}>{`Approved : ${user.isApproved}`}</div>
                        </div>
                    </div>
                </div>) : (<Loading />)
            }
        </>
    )
}

export default Page