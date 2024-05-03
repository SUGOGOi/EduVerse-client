
import React from 'react';
import style from './page.module.scss';
import Link from "next/link"

const Page = () => {
    // Dummy data for total users and courses
    const totalUsers = 1000;
    const totalCourses = 50;

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
                <h1>Welcome to Admin Dashboard</h1>
                <div className={style.dashboard_card}>
                    <div className={style.card}>
                        <h2>Total Users</h2>
                        <p>{totalUsers}</p>
                    </div>
                    <div className={style.card}>
                        <h2>Total Courses</h2>
                        <p>{totalCourses}</p>
                    </div>
                </div>
                {/* Add your dashboard components and content here */}
            </div>
        </div>
    );
}

export default Page;
