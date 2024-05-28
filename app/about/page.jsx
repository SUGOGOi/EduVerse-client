
import React from 'react'
import style from "./page.module.scss"
import Navbar from '@/components/navbar/Navbar'
import Image from "next/image"
import img from "../../public/images/eduverseHome.jpg"
import Footer from '@/components/footer/Footer'
import Link from 'next/link'



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
            <div className={style.footer}>
                <div className={style.linkContainer}>
                    <Link className={style.links} href="/login">Login</Link>
                    <Link className={style.links} href="/contact">Home</Link>
                    <Link className={style.links} href="/courses">Courses</Link>
                    <Link className={style.links} href="/about">About</Link>
                    <Link className={style.links} href="/contact">Contact</Link>
                </div>
                <h1 className={style.logoFooter}>
                    &#169; EduVerse
                </h1>
            </div>

        </>
    )
}

export default Page