"use client"
import { useState } from "react";
import style from "./contactmessagecard.module.scss"
import { FaEye } from "react-icons/fa";



const ContactMessageCard = ({ name, email, message }) => {
    const [showMessageModal, setShowMessageModal] = useState(false);


    const showModal = () => {
        setShowMessageModal(!showMessageModal)
    }




    return (
        <>
            <div className={style.card}>

                <p> Name : {name}</p>
                <p>Email : {`${email}`}</p>
                <FaEye size={22} onClick={showModal} />


            </div>
            {showMessageModal && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <button className={style.close_button} onClick={showModal}>X</button>

                        <div className={style.modal_content}>
                            <h3>{`MESSAGE`}</h3>
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ContactMessageCard