"use client"
import React from 'react'
import style from "./slider.module.scss"
import Image from "next/image"
import img from "../../public/images/eduverseHome.jpg"

const Slider = () => {
    return (
        <div className={style.container}>
            <Image src={img} className={style.slider} alt='' />
        </div>
    )
}

export default Slider