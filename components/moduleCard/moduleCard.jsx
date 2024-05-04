"use client"
import React, { useState } from 'react'
import style from "./moduleCard.module.scss"
import { FaEye } from "react-icons/fa";
import { BiSolidVideoPlus } from "react-icons/bi";
import Loading from '@/app/loading';
import { MdDelete } from "react-icons/md";

const ModuleCard = ({ moduleName, moduleId }) => {
    const [videoShowModal, setVideoShowModal] = useState(false);
    const [addVideoModal, setAddVideoModal] = useState(false);

    const videos = [
        {
            name: "v1",
            url: "u1"
        },
        {
            name: "v2",
            url: "u2"
        }
    ]

    // const videos = undefined;


    const toggleVideoShowModal = () => {
        setVideoShowModal(!videoShowModal);
    };

    const toggleAddVideoModal = () => {
        setAddVideoModal(!addVideoModal);
    }

    const deleteVideoHandller = () => {
        // setAddVideoModal(!addVideoModal);
    }
    return (
        <>
            <div className={style.moduleCon} >

                <h3>{`${moduleName}`}</h3>
                <p>{`${moduleId}`}</p>

                <div className={style.viewVideos}  ><FaEye size={22} /><p onClick={toggleVideoShowModal} >view videos</p></div>
                <div className={style.addVideo}><BiSolidVideoPlus size={30} onClick={toggleAddVideoModal} /></div>
            </div>

            {videoShowModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button className={style.close_button} onClick={toggleVideoShowModal}>X</button>
                        <h2>{`${moduleName}`}</h2>
                        <div className={style.modal_content}>
                            {videos ? (videos.map((item, index) => (
                                <div key={index} className={style.modal_item}>
                                    <p>Name : {item.name}</p>
                                    <p>url : {item.url}</p>
                                    <MdDelete size={22} onClick={deleteVideoHandller} className={style.deleteVideoBtn} />
                                </div>


                            ))) : (<Loading />)}
                        </div>
                    </div>
                </div>
            )}

            {addVideoModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button className={style.close_button} onClick={toggleAddVideoModal}>X</button>
                        <h2>ADD VIDEO</h2>
                        <div className={style.modal_content}>
                            <input className={style.inputName} type="text" name='vname' placeholder='video name' />
                            <input className={style.inputUrl} type="text" name='url' placeholder='video url' />
                            <button className={style.AddBtn}  >Add</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModuleCard