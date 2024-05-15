import Home from '@/components/home/Home'
import React from 'react'
import style from "./page.module.scss"
import Footer from '@/components/footer/Footer'


const page = () => {
  return (
    <div className={style.container}  >   <Home />
      <Footer />
    </div>
  )
}

export default page