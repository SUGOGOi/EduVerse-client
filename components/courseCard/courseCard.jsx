"use client"
import { useSelector } from "react-redux";
import style from "./courseCard.module.scss"
import { MdDelete } from "react-icons/md";
import { getAllCourses, useDeleteCourseMutation } from "@/redux/apis/courseApi";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";



const CourseCard = ({ name, school, cid, Class, modules }) => {
    const { user } = useSelector(state => state.userReducer);
    const [deleteCourse, { }] = useDeleteCourseMutation()
    const dispatch = useDispatch("");


    const deleteCourseHandller = async ({ cid }) => {
        const res = await deleteCourse({ cid: cid, id: user._id });
        if ("data" in res) {
            toast.success(res.data.message);
        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error);
        }

        let token = Cookies.get("token")
        dispatch(getAllCourses(token))
    }
    return (
        <div className={style.card}>
            {
                user.role === "admin" ? (<>
                    <p>School : {school}</p>
                    <p>Id : {cid}</p>
                </>) : (<p>Id : {cid}</p>)
            }
            <p> Name : {name}</p>
            <p>Class : {`${Class}`}</p>
            <p>Modules : {`${modules}`}</p>
            <p><a href={`/dashboard/course-detail/${cid}`}  >Edit</a></p>
            <MdDelete className={style.delete} onClick={() => deleteCourseHandller({ cid: cid })} size={22} />
        </div>
    )
}

export default CourseCard