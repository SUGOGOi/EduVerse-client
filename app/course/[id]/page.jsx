"use client"
import React, { useState } from 'react'
import style from "./page.module.scss"
import Navbar from '@/components/navbar/Navbar';
import { useGetCourseByIdQuery } from '@/redux/apis/courseApi';
import { useDispatch } from 'react-redux';

const Page = () => {
    const [loadCourseState, setLoadCourseState] = useState(1)
    const { data, error } = useGetCourseByIdQuery(loadCourseState);
    const dispatch = useDispatch();
    const videos = [
        'https://www.youtube.com/watch?v=hvKaPTmQBA8&list=RDhvKaPTmQBA8&start_radio=1',
        'https://www.example.com/video2.mp4',
        'https://www.example.com/video3.mp4'
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const playVideo = (index) => {
        setCurrentVideoIndex(index);
    };

    return (
        <>
            <Navbar />
            <div className={style.con}>
                <div className={style.video_container}>
                    <video controls autoPlay src={videos[currentVideoIndex]} className={style.main_video} />
                </div>
                <div className={style.playlist}>
                    <h2>Playlist</h2>
                    <ul>
                        {videos.map((video, index) => (
                            <li key={index} onClick={() => playVideo(index)}>
                                Video {index + 1}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Page