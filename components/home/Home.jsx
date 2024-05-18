"use client"
import React, { useEffect } from 'react'
import style from "./home.module.scss"
import Slider from '../slider/Slider'
import Navbar from '../navbar/Navbar'
import { useDispatch, useSelector } from "react-redux"
import { getMyProfile } from "@/redux/apis/userApi"
import { NextResponse } from "next/server";



const Home = () => {
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyProfile())
    }, [])
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
            {/* <Footer /> */}

        </>
    )
}

export default Home