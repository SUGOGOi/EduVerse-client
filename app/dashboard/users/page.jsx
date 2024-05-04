
import React from 'react';
import style from './page.module.scss';
import Link from "next/link"

const Card = ({ name, id, isApproved, paymentLink }) => {
    const approveHandller = async () => {
        console.log("ll")
    }

    return (
        <div className={style.card}>
            <p>ID : {id}</p>
            <p> Name : {name}</p>
            <p>Approve : {`${isApproved}`}</p>
            {
                isApproved === false ? (<button>approve</button>) : (<button>reject</button>)
            }
            <p><a href={`${paymentLink}`} target="_blank" >Payment Info</a></p>
        </div>
    )
}

const Page = () => {
    // Dummy data for total users and courses
    const link = "http://res.cloudinary.com/dikx4aj2f/image/upload/v1714706100/kn1rnqdu5zjr8hlxraws.jpg"

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
                <div className={style.dashboard_card}>
                    <Card id={"qwee"} name={"sumsum"} isApproved={false} paymentLink={link} />
                </div>
                {/* Add your dashboard components and content here */}
            </div>
        </div>
    );
}

export default Page;
