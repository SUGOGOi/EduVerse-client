"use client"
import React, { useEffect, useState } from 'react';
import style from './page.module.scss';
import Link from "next/link"
import { getCourseById, useAllCoursesQuery, useCreateChapterMutation } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorReducer, clearMessageReducer, createChapterFailReducer, createChapterReducer, loadCoursesFailReducer, loadCoursesReducer } from '@/redux/reducers/courseReducer';
import Loading from '@/app/loading';
import CourseCard from '@/components/courseCard/courseCard';
import { usePathname } from "next/navigation"
import ModuleCard from '@/components/moduleCard/moduleCard';
import { MdCreateNewFolder } from 'react-icons/md';
import { getMyProfile } from '@/redux/apis/userApi';
import toast from 'react-hot-toast';

const Page = () => {
    const [createChapter, { }] = useCreateChapterMutation()
    let { course } = useSelector(state => state.courseReducer);
    let { user } = useSelector(state => state.userReducer);
    const [name, setName] = useState("");
    const [createChapterModal, setCreateChapterModal] = useState(false);
    const dispatch = useDispatch();
    const pathname = usePathname();


    const showModal = () => {
        setCreateChapterModal(!createChapterModal)
    }

    const createChapterHandller = async (e) => {
        e.preventDefault();

        const res = await createChapter({ id: user._id, cid: course._id, name });

        if ("data" in res) {
            toast.success(res.data.message)
            // console.log(res.data)
            dispatch(createChapterReducer(res.data))
            dispatch(clearMessageReducer())
            showModal();
            dispatch(getCourseById(pathname.split("/").pop()))
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
            dispatch(createChapterFailReducer(messageRes));
            dispatch(clearErrorReducer())
            showModal();
        }
    }



    useEffect(() => {

        dispatch(getMyProfile())
    }, [])

    useEffect(() => {
        dispatch(getCourseById(pathname.split("/").pop()))
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
                    <nav className={style.navbar}>
                        <Link href="/profile">Profile</Link>
                        {/* Add more navbar items as needed */}
                    </nav>
                    {
                        course ? (<div className={style.courseInfo}>
                            <h2 className={style.hTitle} >{`${course.subject}`}</h2>
                            <h2>Class : {`${course.class}`}</h2>

                            <h2>Creator : {`${course.creator}`}</h2>
                            <div className={style.createChp} onClick={showModal} ><MdCreateNewFolder size={25} />
                                <p>create chapter</p>
                            </div>

                        </div>) : (<Loading />)
                    }
                    {
                        course ? (course.modules != 0 ? (course.modules.map((i, index) => (
                            <ModuleCard key={index} moduleName={i.title} moduleId={i._id} />
                        ))) : (<h2 className={style.h2} >No Chapter found</h2>)) : (<Loading />)
                    }
                </div>
            </div>

            {createChapterModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button className={style.close_button} onClick={showModal}>X</button>

                        <div className={style.modal_content}>
                            <h2>{`CREATE CHAPTER`}</h2>
                            <div className={style.modalForm} >
                                <input className={style.inputName} type="text" name='name' onChange={(e) => setName(e.target.value)} placeholder='enter chapter name' />
                                <button className={style.AddBtn} onClick={createChapterHandller}  >Create</button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default Page;
