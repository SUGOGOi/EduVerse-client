"use client"
import React from 'react'
import ReactPlayer from 'react-player'
import style from "./reactPlayer.module.scss"


const Reactplayer = ({ videosrc }) => {
    return (
        <div className={style.container}>
            <ReactPlayer
                width="100%"
                height="100%"
                url={videosrc}
                controls={true}
                // light is usefull incase of dark mode
                light={false}
                // picture in picture
                pip={true}
            />
        </div>
    )
}

export default Reactplayer