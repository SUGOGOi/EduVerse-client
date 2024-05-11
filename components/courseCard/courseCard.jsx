"use client"
import { useSelector } from "react-redux";
import style from "./courseCard.module.scss"
import { MdDelete } from "react-icons/md";


const CourseCard = ({ name, school, id, Class, modules }) => {
    const { user } = useSelector(state => state.userReducer);

    const deleteCourseHandller = () => {

    }
    return (
        <div className={style.card}>
            {
                user.role === "admin" ? (<>
                    <p>School : {school}</p>
                </>) : (<p>Id : {id}</p>)
            }
            <p> Name : {name}</p>
            <p>Class : {`${Class}`}</p>
            <p>Modules : {`${modules}`}</p>
            <p><a href={`/dashboard/course-detail/${id}`}  >Edit</a></p>
            <MdDelete className={style.delete} onClick={deleteCourseHandller} size={22} />
        </div>
    )
}

export default CourseCard