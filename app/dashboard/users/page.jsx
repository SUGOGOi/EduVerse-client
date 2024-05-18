"use client"
import React, { useEffect } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { getAllUsers, getMyProfile } from '@/redux/apis/userApi';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/app/loading';
import { RiEdit2Fill } from "react-icons/ri";
import Cookies from 'js-cookie';

const Card = ({ name, id, isApproved, role }) => {
    const { user } = useSelector(state => state.userReducer);

    return (
        <div className={style.card}>
            <p> Name : {name}</p>
            <p>Approve : {`${isApproved}`}</p>
            {
                user.role === "admin" ? (<>
                    <p>Role : {role === "admin" ? (<span className={style.roleAdmin} >{`${role}`}</span>) : (role === "teacher" ? (<span className={style.roleTeacher} >{`${role}`}</span>) : (`${role}`))}</p>
                    <Link href={`/dashboard/user-detail/${id}`} className={style.editUserIcon} ><RiEdit2Fill size={22} /></Link>
                </>) : (<></>)
            }
        </div>
    )
}

const Page = () => {
    const { user, users } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {

        let token = Cookies.get("token")

        if (token) {
            if (!user) {
                dispatch(getMyProfile(token))
            }
        }
    }, [])

    useEffect(() => {
        if (user) {
            dispatch(getAllUsers({ id: user._id }))
        }
    }, [user])

    return (
        <div className={style.admin_dashboard}>
            <div className={style.sidebar}>
                <h2>EduVerse Panel</h2>
                <ul>
                    {
                        user && user.role === "teacher" ? (<>
                            <li><Link className={style.links} href={"/dashboard/users"} >Students</Link></li>
                            <li><Link className={style.links} href={"/dashboard/courses"} >Courses</Link></li>
                        </>) : (
                            user && user.role === "admin" ? (<><li><Link className={style.links} href={"/dashboard"} >Dashboard</Link></li>
                                <li><Link className={style.links} href={"/dashboard/users"} >Users</Link></li>
                                <li><Link className={style.links} href={"/dashboard/courses"} >Courses</Link></li>
                                <li><Link className={style.links} href={"/dashboard/contact"} >Contact Messages</Link></li>
                            </>) : (<></>)
                        )
                    }
                </ul>
            </div>
            <div className={style.main_content}>
                {/* Main content of the dashboard */}
                <nav className={style.navbar}>
                    <Link href="/profile">Profile</Link>
                    {/* Add more navbar items as needed */}
                </nav>
                {
                    user && user.role === "admin" ? (<h1>All Users</h1>) : (<h1>All Students of your school</h1>)
                }
                <div className={style.dashboard_container}>
                    {
                        users ? (
                            users.length > 0 ? (users.map((i, index) => (
                                <Card key={index} id={i._id} name={i.name} role={i.role} isApproved={i.isApproved} />
                            ))) : (<h2 className={style.h2} >No student yet</h2>)
                        ) : (<Loading />)
                    }
                </div>
                {/* Add your dashboard components and content here */}
            </div>
        </div>
    );
}

export default Page;
