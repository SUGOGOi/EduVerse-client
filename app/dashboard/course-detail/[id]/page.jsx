"use client"
import React, { useEffect } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { useAllCoursesQuery } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { loadCoursesFailReducer, loadCoursesReducer } from '@/redux/reducers/courseReducer';
import Loading from '@/app/loading';
import CourseCard from '@/components/courseCard/courseCard';
import { usePathname } from "next/navigation"
import ModuleCard from '@/components/moduleCard/moduleCard';


const Page = () => {
    // const { data, isLoading, isError, error } = useAllCoursesQuery();
    // const { course } = useSelector(state => state.courseReducer);
    const course = {
        subject: "Science",
        class: "6",
        modules: [
            {
                name: "chapter 1",
                _id: "dsjdkbbsfw"
            },
            {
                name: "chapter 2",
                _id: "lsjdkbbsfwca"
            }
        ]
    }

    const dispatch = useDispatch();
    const pathname = usePathname();

    const loadCourseDetailHandller = async () => {

    }




    // useEffect(() => {
    //     if (data) {
    //         // toast.success(data.message)
    //         // dispatch(loadCoursesReducer(data))
    //     }
    //     // if (error) {
    //     //     // console.log(error)
    //     //     const err = error;
    //     //     const messageRes = err.data.error;
    //     //     toast.error(messageRes)
    //     //     dispatch(loadCoursesFailReducer(err))
    //     // }


    // }, [data, error])

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
                <div className={style.courseInfo}>
                    <h1>{`${course.subject}`}</h1>
                    <h1>class : {`${course.class}`}</h1>
                </div>
                {
                    course.modules != 0 ? (course.modules.map((i, index) => (
                        <ModuleCard key={index} moduleName={i.name} moduleId={i._id} />
                    ))) : (<Loading />)
                }
            </div>
        </div>
    );
}

export default Page;
