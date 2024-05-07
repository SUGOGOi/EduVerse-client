"use client"
import React, { useEffect } from 'react'
import style from "./page.module.scss"
import Navbar from '@/components/navbar/Navbar'
import Image from "next/image"
import img from "../../public/images/eduverseHome.jpg"



const Page = () => {




    return (
        <>
            <Navbar />

            <div className={style.container} >
                <h1>About EduVerse</h1>
                <div className={style.aboutText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam adipisci accusamus, labore eaque assumenda aliquid natus quis quas possimus porro obcaecati, architecto reprehenderit deleniti nemo iure explicabo! Consectetur facere corrupti exercitationem facilis reprehenderit, ipsum ab quaerat, dolorum, est temporibus sunt nostrum obcaecati quia repellendus itaque praesentium animi laboriosam ut neque id ducimus. Quidem exercitationem facere ex! Quos esse reprehenderit soluta, optio eum iusto qui, exercitationem laudantium ratione quae voluptate tenetur! Magni temporibus qui optio laudantium doloremque repudiandae deserunt nobis, corrupti exercitationem veritatis libero nisi modi sequi illum labore! Voluptatum esse inventore sapiente aliquid obcaecati distinctio ipsum neque, minima aperiam? Dolor!
                </div>
                <div className={style.aboutImage}>
                    <Image src={img} className={style.slider} alt='' />
                </div>
            </div>

        </>
    )
}

export default Page