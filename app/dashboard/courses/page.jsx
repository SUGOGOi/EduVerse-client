"use client"
import React, { useEffect, useState } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { useAllCoursesQuery } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { loadCoursesFailReducer, loadCoursesReducer } from '@/redux/reducers/courseReducer';
import Loading from '@/app/loading';
import CourseCard from '@/components/courseCard/courseCard';
import { MdCreateNewFolder } from "react-icons/md";



const Page = () => {
    const { data, isLoading, isError, error } = useAllCoursesQuery();
    const { courses } = useSelector(state => state.courseReducer);
    const [createCourseModal, setCreateCourseModal] = useState(false);


    const dispatch = useDispatch();


    const createCourseHandller = () => {
        setCreateCourseModal(!createCourseModal)
    }




    useEffect(() => {
        if (data) {
            // toast.success(data.message)
            dispatch(loadCoursesReducer(data))
        }
        if (error) {
            // console.log(error)
            const err = error;
            const messageRes = err.data.error;
            toast.error(messageRes)
            dispatch(loadCoursesFailReducer(err))
        }


    }, [data, error])

    return (
        <>
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
                    <div className={style.heading}>
                        <h1>All Courses</h1>
                        <div className={style.create} onClick={createCourseHandller} ><MdCreateNewFolder size={25} />
                            <p>create course</p>
                        </div>
                    </div>

                    <div className={style.dashboard_card}>
                        {
                            courses ? courses.map((i) => (
                                <CourseCard id={i._id} name={i.subject} Class={i.class} />

                            )) : (<Loading />)
                        }
                    </div>
                    {/* Add your dashboard components and content here */}
                </div>
            </div>

            {createCourseModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button className={style.close_button} onClick={createCourseHandller}>X</button>

                        <div className={style.modal_content}>
                            <h2>{`CREATE COURSE`}</h2>
                            <form action="">
                                <input className={style.inputName} type="text" name='subject' placeholder='enter subject' />
                                <input className={style.inputName} type="text" name='class' placeholder='enter class' />
                                <textarea className={style.inputArea} name='description' placeholder='enter decription' />
                                <input className={style.inputName} type="file" name='file' />
                                <button className={style.AddBtn}  >Create</button>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Page;
