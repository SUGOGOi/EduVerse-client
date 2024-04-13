"use client"
import React from 'react'
import style from "./home.module.scss"
import Slider from '../slider/Slider'
import Navbar from '../navbar/Navbar'


const Home = () => {
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