"use client"

import React from 'react'
import Link from 'next/link'
import style from "./footer.module.scss"

const Footer = () => {
    return (
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
    )
}

export default Footer