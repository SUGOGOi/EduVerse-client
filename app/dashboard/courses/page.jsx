"use client"
import React, { useEffect, useState } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { getAllCourses, useCreateCourseMutation } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorReducer, clearMessageReducer, createCourseFailReducer, createCourseReducer } from '@/redux/reducers/courseReducer';
import Loading from '@/app/loading';
import CourseCard from '@/components/courseCard/courseCard';
import { MdCreateNewFolder } from "react-icons/md";
import toast from 'react-hot-toast';
import { getMyProfile } from '@/redux/apis/userApi';
import Cookies from 'js-cookie';




const Page = () => {
    const [createCourse, { isLoading }] = useCreateCourseMutation();
    const [name, setName] = useState("");
    const [Class, setClass] = useState("");
    const [school, setSchool] = useState("");
    const [description, setDescription] = useState("");
    const [imagePrev, setImagePrev] = useState("");
    const [image, setImage] = useState("");
    const { courses } = useSelector(state => state.courseReducer);
    const { user } = useSelector(state => state.userReducer);
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
        if (user.role === "teacher") {
            formData.set("subject", user.subject);
        } else {
            formData.set("subject", name);
        }
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
            dispatch(createCourseReducer(res.data))
            dispatch(clearMessageReducer())
            showModal();
            let token = Cookies.get("token")
            dispatch(getAllCourses(token))
            setImagePrev("")
            setDescription("")

        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
            showModal();
            setImagePrev("")
            setDescription("")
        }
    }


    useEffect(() => {
        let token = Cookies.get("token")
        if (token) {
            if (!user) {
                dispatch(getMyProfile(token))
            }
        }
    }, [])

    useEffect(() => {
        let token = Cookies.get("token")
        if (!courses) {
            // toast.success(data.message)
            dispatch(getAllCourses(token))
        }
    }, [])





    return (
        <>
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
                            <form action=""  >
                                {
                                    user.role === "teacher" ? (<input required className={style.inputName} type="text" name='subject' placeholder='enter subject' value={user.subject} readOnly />) : (<input required className={style.inputName} type="text" name='subject' placeholder='enter subject' onChange={(e) => setName(e.target.value)} />)

                                }
                                {
                                    user.role === "teacher" ? (
                                        <select name="class" required onChange={(e) => setClass(e.target.value)} className={style.inputName}>
                                            <option value={undefined}>For which class?</option>
                                            {
                                                user.classes.map((i, index) => (
                                                    <option value={i} key={index} >{i}</option>
                                                ))
                                            }
                                        </select>) : (<input required className={style.inputName} type="text" name='class' placeholder='enter class' onChange={(e) => setClass(e.target.value)} />)
                                }
                                {
                                    user.role === "teacher" ? (<>
                                        <input className={style.inputName} required type="text" name='school' value={user.school} readOnly />
                                    </>) : (<>
                                        <input className={style.inputName} required type="text" name='school' onChange={(e) => setSchool(e.target.value)} placeholder='enter school' />
                                    </>)
                                }
                                <textarea className={style.inputArea} required name='description' placeholder='enter decription' onChange={(e) => setDescription(e.target.value)} />
                                <label className={style.labelPoster} >Course Poster</label>
                                <input className={style.inputName} required type="file" name='file' accept='image/*' onChange={changeImageHandler} placeholder='course poster' />
                                {
                                    imagePrev && (
                                        <img src={imagePrev} className={style.Img} alt='preview' />
                                    )}
                                <button
                                    type="button"
                                    className={style.AddBtn}
                                    onClick={createCourseHandller}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className={style.lds_ring}>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </>
                                    ) : (
                                        <p>Create</p>
                                    )}
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            )}
            {/* <Footer /> */}
        </>
    );
}

export default Page;
