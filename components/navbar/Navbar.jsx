"use client";
import React, { useState } from "react";
import style from "./navbar.module.scss";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import TopMenu from "../topMenu/TopMenu";
import AuthMenu from "../auth-menu/AuthMenu";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const handleOpen = () => {
        if (isAuthOpen) {
            setIsAuthOpen(!isAuthOpen)
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const handleAuthOpen = () => {
        if (isMenuOpen) {
            setIsMenuOpen(!isMenuOpen);
        }
        setIsAuthOpen(!isAuthOpen)

    }

    return (
        <>
            <div className={style.container}>
                <div className={` ${style.menu}  ${isMenuOpen ? style.active : null}`} onClick={handleOpen}>
                    <div className={style.arrow}>
                        <IoIosArrowUp size={25} />
                    </div>

                    <div className={style.menuText}>
                        <p>Menu</p>
                    </div>
                </div>
                <div className={style.logo}>
                    <h1>EduVerse</h1>
                </div>

                <div className={style.links}>
                    <Link href="/" className={style.navItems}>
                        Home
                    </Link>
                    <Link href="/Courses" className={style.navItems}>
                        Courses
                    </Link>
                    <Link href="/About" className={style.navItems}>
                        About
                    </Link>
                    <Link href="/Contact" className={style.navItems}>
                        Contact
                    </Link>
                </div>
                <div className={style.auth} onClick={handleAuthOpen}  >
                    <IoPerson size={25} />
                </div>
            </div>
            <TopMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <AuthMenu isAuthOpen={isAuthOpen} setIsAuthOpen={setIsAuthOpen} />
        </>
    );
};

export default Navbar;
