"use client"
import React from 'react'
import style from "./authMenu.module.scss"
import Link from "next/link"

const AuthMenu = ({ isAuthOpen, setIsAuthOpen }) => {
    return (
        <div className={`${style.menu} ${isAuthOpen ? style.active : null} `} >
            <ul>
                <li onClick={() => setIsAuthOpen(false)} ><Link href="/login" className={style.menuText} >Login</Link></li>
                <hr />
                <li onClick={() => setIsAuthOpen(false)} ><Link href="/otp-send" className={style.menuText}>Signup</Link></li>

            </ul>
        </div>
    )
}

export default AuthMenu