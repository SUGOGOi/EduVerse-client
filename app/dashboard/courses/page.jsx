"use client"
import React, { useEffect, useState } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { useAllCoursesQuery, useCreateCourseMutation } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorReducer, clearMessageReducer, createCourseFailReducer, createCourseReducer, loadCoursesFailReducer, loadCoursesReducer } from '@/redux/reducers/courseReducer';
import Loading from '@/app/loading';
import CourseCard from '@/components/courseCard/courseCard';
import { MdCreateNewFolder } from "react-icons/md";
import toast from 'react-hot-toast';
import Image from 'next/image';
import { skipToken } from '@reduxjs/toolkit/query';
import { getAllUsers, getMyProfile } from '@/redux/apis/userApi';



const Page = () => {
    const [loadCourseState, setLoadCourseState] = useState(1)
    const { data, isLoading, error } = useAllCoursesQuery(loadCourseState);
    const [createCourse, { }] = useCreateCourseMutation();
    const [load, setLoad] = useState(1);
    const [name, setName] = useState("");
    const [Class, setClass] = useState("");
    const [school, setSchool] = useState("");
    const [description, setDescription] = useState("");
    const [imagePrev, setImagePrev] = useState("");
    const [image, setImage] = useState("");
    const { courses } = useSelector(state => state.courseReducer);
    const { user } = useSelector(state => state.userReducer);
    // const { user } = useSelector(state => state.userReducer);
    const [createCourseModal, setCreateCourseModal] = useState(false);
    const formData = new FormData()


    // console.log(data)



    const dispatch = useDispatch("");

    const changeImageHandler = e => {
        const file = e.target.files[0];
        // console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        }
    }


    const showModal = () => {
        setCreateCourseModal(!createCourseModal)
    }

    const createCourseHandller = async (e) => {
        e.preventDefault();
        formData.set("subject", name);
        formData.set("Class", Class);
        if (user.role === "teacher") {
            formData.set("school", user.school);
        } else {
            formData.set("school", school);
        }
        formData.set("description", description);
        formData.set("file", image);
        const res = await createCourse({ id: user._id, formData });

        if ("data" in res) {
            toast.success(res.data.message)
            console.log(res.data)
            dispatch(createCourseReducer(res.data))
            dispatch(clearMessageReducer())
            showModal();
            setLoadCourseState(loadCourseState + 1);
            setImagePrev("")

        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
            dispatch(createCourseFailReducer(messageRes));
            dispatch(clearErrorReducer())
            showModal();
            setLoadCourseState(loadCourseState + 1);
            setImagePrev("")
        }
    }


    useEffect(() => {
        dispatch(getMyProfile())
    }, [])

    useEffect(() => {
        if (data) {
            dispatch(loadCoursesReducer(data))
        }
    }, [data])





    return (
        <>
            <div className={style.admin_dashboard}>
                <div className={style.sidebar}>
                    <h2>EduVerse Panel</h2>
                    <ul>
                        {
                            user && user.role === "teacher" ? (<>
                                <li><Link className={style.links} href={"/dashboard/users"} >Students</Link></li>
                                <li><Link className={style.links} href={"/dashboard/courses"} >courses</Link></li>
                            </>) : (
                                user && user.role === "admin" ? (<><li><Link className={style.links} href={"/dashboard"} >Dashboard</Link></li>
                                    <li><Link className={style.links} href={"/dashboard/users"} >Users</Link></li>
                                    <li><Link className={style.links} href={"/dashboard/courses"} >courses</Link></li>
                                </>) : (<></>)
                            )
                        }

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
                        <div className={style.create} onClick={showModal} ><MdCreateNewFolder size={25} />
                            <p>create course</p>
                        </div>
                    </div>

                    <div className={style.dashboard_card}>
                        {
                            courses ? courses.map((i, index) => (
                                <CourseCard key={index} cid={i._id} school={i.school} name={i.subject} Class={i.class} modules={i.modules.length} />

                            )) : (<Loading />)
                        }
                    </div>
                    {/* Add your dashboard components and content here */}
                </div>
            </div>

            {createCourseModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button className={style.close_button} onClick={showModal}>X</button>

                        <div className={style.modal_content}>
                            <h2>{`CREATE COURSE`}</h2>
                            <form action="" onSubmit={createCourseHandller} >
                                <input className={style.inputName} type="text" name='subject' onChange={(e) => setName(e.target.value)} placeholder='enter subject' />
                                <select name="class" onChange={(e) => setClass(e.target.value)} className={style.inputName}>
                                    <option value={undefined}>For which class?</option>
                                    {
                                        user.classes.map((i, index) => (
                                            <option value={i} key={index} >{i}</option>
                                        ))
                                    }
                                </select>
                                {
                                    user.role === "teacher" ? (<>
                                        <input className={style.inputName} type="text" name='school' value={user.school} readOnly />
                                    </>) : (<>
                                        <input className={style.inputName} type="text" name='school' onChange={(e) => setSchool(e.target.value)} placeholder='enter school' />
                                    </>)
                                }
                                <textarea className={style.inputArea} name='description' placeholder='enter decription' onChange={(e) => setDescription(e.target.value)} />
                                <input className={style.inputName} type="file" name='file' accept='image/*' onChange={changeImageHandler} placeholder='course poster' />
                                {
                                    imagePrev && (
                                        <img src={imagePrev} className={style.Img} alt='preview' />
                                    )}
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
