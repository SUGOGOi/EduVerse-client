import React from 'react'
import Link from 'next/link'
import style from "./footer.module.scss"

const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.linkContainer}>
                <Link className={style.links} href="/Login">Login</Link>
                <Link className={style.links} href="/Contact">Home</Link>
                <Link className={style.links} href="/Courses">Courses</Link>
                <Link className={style.links} href="/About">About</Link>
                <Link className={style.links} href="/Contact">Contact</Link>
            </div>
            <h1 className={style.logoFooter}>
                &#169; EduVerse
            </h1>
        </div>
    )
}

export default Footer