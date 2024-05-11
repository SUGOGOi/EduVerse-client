"use client"
import React, { useState } from 'react'
import style from "./moduleCard.module.scss"
import { FaEye } from "react-icons/fa";
import { BiSolidVideoPlus } from "react-icons/bi";
import Loading from '@/app/loading';
import { MdDelete } from "react-icons/md";
import { getChapterVideos, getCourseById, useAddVideoMutation, useDeleteChapterMutation, useDeleteVideoMutation } from '@/redux/apis/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { addVideoFailReducer, addVideoReducer, clearErrorReducer, clearMessageReducer } from '@/redux/reducers/courseReducer';
import { RiFileUploadLine } from "react-icons/ri";

const ModuleCard = ({ moduleName, moduleId }) => {
    const [videoShowModal, setVideoShowModal] = useState(false);
    const [addVideoModal, setAddVideoModal] = useState(false);
    const [deleteChapter, { }] = useDeleteChapterMutation();
    const [addVideo, { }] = useAddVideoMutation();
    const [deleteVideo, { }] = useDeleteVideoMutation();
    let { user } = useSelector(state => state.userReducer);
    let { course } = useSelector(state => state.courseReducer);
    let { videos } = useSelector(state => state.courseReducer);
    const pathname = usePathname();
    const [vname, setVname] = useState("");
    const [link, setLink] = useState("");



    const dispatch = useDispatch();


    // const videos = undefined;


    const videoShowModalHandller = () => {
        dispatch(getChapterVideos({ mid: moduleId, id: user._id }))
        setVideoShowModal(!videoShowModal);
    };

    const videoShowModalOnly = () => {
        setVideoShowModal(!videoShowModal);
    };

    const toggleAddVideoModalOnly = () => {
        setAddVideoModal(!addVideoModal);
    }

    const addVideoModalHandller = async () => {
        const res = await addVideo({ id: user._id, mid: moduleId, vname, link })
        if ("data" in res) {
            toast.success(res.data.message)
            dispatch(addVideoReducer(res.data))
            dispatch(clearMessageReducer())

        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
            dispatch(addVideoFailReducer(messageRes));
            dispatch(clearErrorReducer())
        }
        setAddVideoModal(!addVideoModal);
    }

    const deleteVideoHandller = async ({ vid }) => {
        const res = await deleteVideo({ mid: moduleId, id: user._id, vid: vid });
        if ("data" in res) {
            toast.success(res.data.message)
            dispatch(getChapterVideos({ mid: moduleId, id: user._id }))
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
        }
    }

    const deleteChapterHandller = async () => {
        // console.log({ mid: moduleId, id: user._id, cid: course._id })
        const res = await deleteChapter({ mid: moduleId, id: user._id, cid: course._id });
        if ("data" in res) {
            toast.success(res.data.message)
            dispatch(getCourseById(pathname.split("/").pop()))
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
        }
    }
    return (
        <>
            <div className={style.moduleCon} >

                <h3>{`${moduleName}`}</h3>
                <p>{`${moduleId}`}</p>

                <div className={style.viewVideos}  ><FaEye size={22} /><p onClick={videoShowModalHandller} >view videos</p></div>
                <div className={style.addVideo}><BiSolidVideoPlus size={30} onClick={toggleAddVideoModalOnly} /></div>
                <div className={style.uploadPdf}><RiFileUploadLine /></div>
                <div className={style.deleteChap}><MdDelete size={25} onClick={deleteChapterHandller} /></div>
            </div>

            {videoShowModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button className={style.close_button} onClick={videoShowModalOnly}>X</button>
                        <h2>{`${moduleName}`}</h2>
                        <div className={style.modal_content}>
                            {videos ? (videos.length != 0 ? (videos.map((item, index) => (
                                <div key={index} className={style.modal_item}>
                                    <p>Name : {item.vname}</p>
                                    {/* <p>url : {item.link}</p> */}
                                    <MdDelete size={22} onClick={() => deleteVideoHandller({ vid: item._id })} className={style.deleteVideoBtn} />
                                </div>


                            ))) : (<h2>No videos yet</h2>)) : (<Loading />)}
                        </div>
                    </div>
                </div>
            )}

            {addVideoModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button className={style.close_button} onClick={toggleAddVideoModalOnly}>X</button>
                        <h2>ADD VIDEO</h2>
                        <div className={style.modal_content}>
                            <input className={style.inputName} type="text" name='vname' onChange={(e) => setVname(e.target.value)} placeholder='video name' />
                            <input className={style.inputUrl} type="text" name='link' onChange={(e) => setLink(e.target.value)} placeholder='video url' />
                            <button className={style.AddBtn} onClick={addVideoModalHandller} >Add</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModuleCard