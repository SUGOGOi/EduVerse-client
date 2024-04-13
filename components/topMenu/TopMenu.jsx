"use client"
import React from 'react'
import style from "./topMenu.module.scss"
import Link from "next/link"

const TopMenu = ({ isMenuOpen, setIsMenuOpen }) => {
    return (
        <div className={`${style.menu} ${isMenuOpen ? style.active : null} `} >
            <ul>
                <li onClick={() => setIsMenuOpen(false)} ><Link href="/" className={style.menuText} >Home</Link></li>
                <hr />
                <li onClick={() => setIsMenuOpen(false)} ><Link href="/courses" className={style.menuText}>Courses</Link></li>
                <hr />
                <li onClick={() => setIsMenuOpen(false)} ><Link href="/about" className={style.menuText} >About</Link></li>
                <hr />
                <li onClick={() => setIsMenuOpen(false)} ><Link href="/contact" className={style.menuText}>Contact</Link></li>
            </ul>
        </div>
    )
}

export default TopMenu