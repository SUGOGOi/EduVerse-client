
"use client"
import Home from '@/components/home/Home'
import React from 'react'
import style from "./page.module.scss"
import Footer from '@/components/footer/Footer'
import Link from 'next/link'


const page = () => {
  return (
    <div className={style.container}  >   <Home />
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
    </div>
  )
}

export default page