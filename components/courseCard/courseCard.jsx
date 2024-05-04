import style from "./courseCard.module.scss"


const CourseCard = ({ name, id, Class, modules }) => {
    return (
        <div className={style.card}>
            <p>ID : {id}</p>
            <p> Name : {name}</p>
            <p>Class : {`${Class}`}</p>
            <p>Modules : {`${modules}`}</p>

            <p><a href={`/dashboard/course-detail/${id}`}  >Edit Course</a></p>
        </div>
    )
}

export default CourseCard