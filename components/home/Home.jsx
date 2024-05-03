"use client"
import React, { useEffect } from 'react'
import style from "./home.module.scss"
import Slider from '../slider/Slider'
import Navbar from '../navbar/Navbar'
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { useGetMyProfileQuery } from "@/redux/apis/userApi"
import { loadUserReducer } from '@/redux/reducers/userReducer'


const Home = () => {
    const { data, isLoading, error } = useGetMyProfileQuery();
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

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
            <div className={style.mmmm}>

                <div className={style.container}>
                    <Slider />
                </div>
                <div className={style.courses}>
                    <h1 id="header">What do you want to learn?</h1>
                    <div className={style.coursetags}>
                        <div className={style.tags}>IT</div>
                        <div className={style.tags}>Web</div>
                        <div className={style.tags}>Agriculture</div>
                        <div className={style.tags}>Music</div>
                        <div className={style.tags}>Design</div>
                        <div className={style.tags}>Fashion</div>
                        <div className={style.tags}>Accounting</div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home