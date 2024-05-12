"use client";
import React, { useState } from "react";
import style from "./moduleCard.module.scss";
import { FaEye } from "react-icons/fa";
import { BiSolidVideoPlus } from "react-icons/bi";
import Loading from "@/app/loading";
import { MdDelete } from "react-icons/md";
import {
    getChapterMaterials,
    getCourseById,
    useAddPdfMutation,
    useAddVideoMutation,
    useDeleteChapterMutation,
    useDeletePdfMutation,
    useDeleteVideoMutation,
} from "@/redux/apis/courseApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import {
    addVideoFailReducer,
    addVideoReducer,
    clearErrorReducer,
    clearMessageReducer,
} from "@/redux/reducers/courseReducer";
import { RiFileUploadLine } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";

const ModuleCard = ({ moduleName, moduleId }) => {
    const [videoOrPdfShowModal, setVideoOrPdfShowModal] = useState(false);
    const [addVideoModal, setAddVideoModal] = useState(false);
    const [addPdfModal, setAddPdfModal] = useState(false);
    const [deleteChapter, { }] = useDeleteChapterMutation();
    const [addVideo, { }] = useAddVideoMutation();
    let [addPdf, { }] = useAddPdfMutation();
    const [deleteVideo, { }] = useDeleteVideoMutation();
    const [deletePdf, { }] = useDeletePdfMutation();
    let { user } = useSelector((state) => state.userReducer);
    let { course } = useSelector((state) => state.courseReducer);
    let { materials } = useSelector((state) => state.courseReducer);
    const pathname = usePathname();
    const [vname, setVname] = useState("");
    const [pname, setPname] = useState("");
    const [pdf, setPdf] = useState("");
    const [link, setLink] = useState("");
    const formData = new FormData();
    let isLoading = false

    const dispatch = useDispatch();

    // const videos = undefined;

    const videoShowModalHandller = () => {
        dispatch(getChapterMaterials({ mid: moduleId }));
        setVideoOrPdfShowModal(!videoOrPdfShowModal);
    };

    const videoOrPdfShowModalOnly = () => {
        setVideoOrPdfShowModal(!videoOrPdfShowModal);
    };

    const toggleAddVideoModalOnly = () => {
        setAddVideoModal(!addVideoModal);
    };

    const addVideoModalHandller = async () => {
        const res = await addVideo({ id: user._id, mid: moduleId, vname, link });
        if ("data" in res) {
            toast.success(res.data.message);
            dispatch(addVideoReducer(res.data));
            dispatch(clearMessageReducer());
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error);
            dispatch(addVideoFailReducer(messageRes));
            dispatch(clearErrorReducer());
        }
        setAddVideoModal(!addVideoModal);
    };

    const deleteVideoHandller = async ({ vid }) => {
        const res = await deleteVideo({ mid: moduleId, id: user._id, vid: vid });
        if ("data" in res) {
            toast.success(res.data.message);
            dispatch(getChapterMaterials({ mid: moduleId, id: user._id }));
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error);
        }
    };

    const deleteChapterHandller = async () => {
        // console.log({ mid: moduleId, id: user._id, cid: course._id })
        const res = await deleteChapter({
            mid: moduleId,
            id: user._id,
            cid: course._id,
        });
        if ("data" in res) {
            toast.success(res.data.message);
            dispatch(getCourseById(pathname.split("/").pop()));
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error);
        }
    };

    const pdfUploadModalOnly = async () => {
        setAddPdfModal(!addPdfModal);
    };

    const changePdfHandler = async (e) => {
        const file = e.target.files[0];
        // console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // setImagePrev(reader.result);
            setPdf(file);
        };
    };

    const addPdfModalHandller = async () => {
        // e.preventDefault();
        isLoading = true;
        formData.set("pname", pname);
        formData.set("file", pdf);

        const res = await addPdf({ id: user._id, mid: moduleId, formData });
        isLoading = false;
        if ("data" in res) {
            toast.success(res.data.message);
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error);
        }
        setAddPdfModal(!addPdfModal);
    };


    const deletePdfHandller = async ({ pid }) => {
        isLoading = true
        const res = await deletePdf({ mid: moduleId, id: user._id, pid: pid });
        isLoading = false
        if ("data" in res) {
            toast.success(res.data.message);
            dispatch(getChapterMaterials({ mid: moduleId, id: user._id }));
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error);
        }
    }

    return (
        <>
            <div className={style.moduleCon}>
                <h3>{`${moduleName}`}</h3>
                <p>{`${moduleId}`}</p>

                <div className={style.viewVideos}>
                    <FaEye size={22} />
                    <p onClick={videoShowModalHandller}>view content</p>
                </div>
                <div className={style.addVideo}>
                    <BiSolidVideoPlus size={25} onClick={toggleAddVideoModalOnly} />
                </div>
                <div className={style.uploadPdf}>
                    <RiFileUploadLine size={22} onClick={pdfUploadModalOnly} />
                </div>
                <div className={style.deleteChap}>
                    <MdDelete size={25} onClick={deleteChapterHandller} />
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
                                                        <p>PDF Name: {item.pname}</p>
                                                        <a
                                                            href={`http://localhost:8000/${item.url}`}
                                                            target="_blank"
                                                        >
                                                            Link
                                                        </a>
                                                        {
                                                            isLoading ? (<AiOutlineLoading size={22} className={style.deleteLoadingBtn} />) : (<MdDelete
                                                                size={22}
                                                                onClick={() => deletePdfHandller({ pid: item._id })}
                                                                className={style.deleteVideoBtn}
                                                            />)
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>Video Name: {item.vname}</p>
                                                        <a href={`${item.link}`} target="_blank">
                                                            Link
                                                        </a>
                                                        {
                                                            isLoading ? (<AiOutlineLoading size={22} className={style.deleteLoadingBtn} />) : (<MdDelete
                                                                size={22}
                                                                onClick={() => deleteVideoHandller({ vid: item._id })}
                                                                className={style.deleteVideoBtn}
                                                            />)
                                                        }
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

            {addVideoModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button
                            className={style.close_button}
                            onClick={toggleAddVideoModalOnly}
                        >
                            X
                        </button>
                        <h2>ADD VIDEO</h2>
                        <div className={style.modal_content}>
                            <input
                                className={style.inputName}
                                type="text"
                                name="vname"
                                onChange={(e) => setVname(e.target.value)}
                                placeholder="video name"
                                required
                            />
                            <input
                                className={style.inputUrl}
                                type="text"
                                name="link"
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="video url"
                                required
                            />
                            <button
                                type="button"
                                className={style.AddBtn}
                                onClick={addVideoModalHandller}
                            >
                                <span className={style.button__text}>Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {addPdfModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button className={style.close_button} onClick={pdfUploadModalOnly}>
                            X
                        </button>
                        <h2>ADD PDF</h2>
                        <div className={style.modal_content}>
                            <input
                                className={style.inputName}
                                type="text"
                                name="name"
                                onChange={(e) => setPname(e.target.value)}
                                placeholder="pdf name"
                            />
                            <input
                                className={style.inputUrl}
                                type="file"
                                accept="application/pdf"
                                name="pdf"
                                onChange={changePdfHandler}
                            />
                            <button
                                type="button"
                                className={style.AddBtn}
                                onClick={addPdfModalHandller}
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
                                    <p>Save</p>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModuleCard;
