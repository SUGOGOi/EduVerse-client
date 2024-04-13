import React from 'react'
import load from "../public/gif/loading.gif"
import Image from 'next/image'
import style from "./page.module.scss"
const loading = () => {
    return (
        <div className={style.loadingCon} >
            <Image alt='loading..' src={load} className={style.loadImg} />
        </div>
    )
}

export default loading