"use client";
import React, { useState } from "react";
import style from "./usermodulecard.module.scss";
import { FaEye } from "react-icons/fa";
import Loading from "@/app/loading";
import {
    getChapterMaterials
} from "@/redux/apis/courseApi";
import { useDispatch, useSelector } from "react-redux";
import { FaPlayCircle } from "react-icons/fa";



const UserModuleCard = ({ moduleName, moduleId, setVideoLink }) => {
    const [videoOrPdfShowModal, setVideoOrPdfShowModal] = useState(false);
    let { materials } = useSelector((state) => state.courseReducer);


    const playVideoHandller = ({ link }) => {
        setVideoOrPdfShowModal(!videoOrPdfShowModal)
        setVideoLink(`${link}`)
    };

    const dispatch = useDispatch();

    // const videos = undefined;

    const videoShowModalHandller = () => {
        dispatch(getChapterMaterials({ mid: moduleId }));
        setVideoOrPdfShowModal(!videoOrPdfShowModal);
    };

    const videoOrPdfShowModalOnly = () => {
        setVideoOrPdfShowModal(!videoOrPdfShowModal);
    };




    return (
        <>
            <div className={style.moduleCon}>
                <h3>{`${moduleName}`}</h3>

                <div className={style.viewVideos}>
                    <FaEye size={22} onClick={videoShowModalHandller} />
                </div>
            </div>

            {videoOrPdfShowModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button
                            className={style.close_button}
                            onClick={videoOrPdfShowModalOnly}
                        >
                            X
                        </button>
                        <h2>{`${moduleName}`}</h2>
                        <div className={style.modal_content}>
                            {materials ? (
                                materials.length != 0 ? (
                                    materials.map((item, index) => (
                                        <div key={index} className={style.modal_item}>
                                            <div className={style.modal_item_inside}>
                                                {" "}
                                                {item.pname ? (
                                                    <>
                                                        <p>PDF : {item.pname}</p>
                                                        <a
                                                            href={`${process.env.SERVER}${item.url}`}
                                                            target="_blank"
                                                        >
                                                            Link
                                                        </a>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>Video : {item.vname}</p>
                                                        {/* <a href={`${item.link}`} target="_blank">
                                                            Link
                                                        </a> */}
                                                        <FaPlayCircle size={22} className={style.playBtn} onClick={() => playVideoHandller({ link: item.link })} />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h2>No videos yet</h2>
                                )
                            ) : (
                                <Loading />
                            )}
                        </div>
                    </div>
                </div>
            )}



        </>
    );
};

export default UserModuleCard;
