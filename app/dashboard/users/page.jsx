"use client"
import React, { useEffect } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { getAllUsers, getMyProfile, useApproveUserMutation } from '@/redux/apis/userApi';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';

const Card = ({ name, id, isApproved, paymentLink }) => {
    const { user } = useSelector(state => state.userReducer);
    const [approveUser, { isLoading }] = useApproveUserMutation()
    const dispatch = useDispatch();

    const approveHandller = async ({ uid, id }) => {
        const res = await approveUser({ id, uid });
        if ("data" in res) {
            toast.success(res.data.message)
            dispatch(getAllUsers({ id }))

        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
        }
    }

    return (
        <div className={style.card}>
            <p>ID : {id}</p>
            <p> Name : {name}</p>
            <p>Approve : {`${isApproved}`}</p>
            {
                isApproved === false ? (<button onClick={() => approveHandller({ id: user._id, uid: id })} >approve</button>) : (<button>reject</button>)
            }
            <p><a href={`${paymentLink}`} target="_blank" >Payment Info</a></p>
        </div>
    )
}

const Page = () => {
    const { user, users } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();




    useEffect(() => {
        dispatch(getMyProfile())
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
                    <li><Link className={style.links} href={"/dashboard"} >Dashboard</Link></li>
                    <li><Link className={style.links} href={"/dashboard/users"} >Users</Link></li>
                    <li><Link className={style.links} href={"/dashboard/courses"} >courses</Link></li>
                    {/* Add more menu items as needed */}
                </ul>
            </div>
            <div className={style.main_content}>
                {/* Main content of the dashboard */}
                <nav className={style.navbar}>
                    <Link href="/profile">Profile</Link>
                    {/* Add more navbar items as needed */}
                </nav>
                <h1>All Users</h1>
                <div className={style.dashboard_container}>
                    {
                        users ? (
                            users.map((i, index) => (
                                <Card key={index} id={i._id} name={i.name} paymentLink={i.paymentPhoto.url} isApproved={i.isApproved} />
                            ))
                        ) : (<Loading />)
                    }
                </div>
                {/* Add your dashboard components and content here */}
            </div>
        </div>
    );
}

export default Page;
