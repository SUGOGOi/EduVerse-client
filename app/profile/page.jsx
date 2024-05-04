"use client"
import React, { useEffect } from 'react'
import style from "./page.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { loadUserReducer } from '@/redux/reducers/userReducer'
import Navbar from '@/components/navbar/Navbar'
import { toast } from "react-hot-toast";
import Loading from '../loading'
import Link from "next/link"


const Page = () => {
    const { user } = useSelector(state => state.userReducer);

    const dispatch = useDispatch();




    return (
        <>
            <Navbar />
            {
                user ? (<div className={style.container} >
                    <div className={style.profileCon}>
                        <div className={style.myDetails}>
                            <img src={`${user.paymentPhoto.url}`} alt='' className={style.image} />
                            <div className={style.name}>{`${user.name}`}</div>
                            <div className={style.email}>{`${user.email}`}</div>
                            {
                                user.role === "admin" ? (<div className={style.dashBtn}  > <Link className={style.Link} href={"/dashboard"}>Go to Dashboard</Link></div>) : (<div className={style.approved}>{`Approved : ${user.isApproved}`}</div>)
                            }
                        </div>
                    </div>
                </div>) : (<Loading />)
            }
        </>
    )
}

export default Page