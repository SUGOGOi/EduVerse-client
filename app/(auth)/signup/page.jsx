"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRegisterUserMutation } from "@/redux/apis/userApi"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { clearErrorReducer, clearMessageReducer, emailClearReducer, registerFailReducer, registerReducer, roleClearReducer } from "@/redux/reducers/userReducer"
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Footer from "@/components/footer/Footer"
import Cookies from 'js-cookie';


const Page = () => {
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const dispatch = useDispatch();
    const { role, email } = useSelector(state => state.userReducer);
    const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    const [phno, setPhno] = useState("");
    const [Class, setClass] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [school, setSchool] = useState();
    const [subject, setSubject] = useState("");
    const [imagePrev, setImagePrev] = useState("");
    const [image, setImage] = useState("");
    const formData = new FormData()
    const router = useRouter();
    const [isShow, setIsShow] = useState("");
    const [isCShow, setIsCShow] = useState("");
    const [isProcced, setIsProcced] = useState(false);



    const showHandler = () => {
        setIsShow(!isShow);
    }
    const cshowHandler = () => {
        setIsCShow(!isCShow);
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("phno", phno);
        formData.set("school", school);
        formData.set("password", password);
        formData.set("file", image);
        formData.set("name", name);
        formData.set("Class", Class);
        formData.set("role", role);
        if (role === "teacher" || role === "student") {
            setSubject(subject.toUpperCase())
            formData.set("subject", subject);
        }

        const res = await registerUser({ formData });

        if ("data" in res) {

            const { token, role } = res.data;
            // console.log(token)
            // console.log(role)

            Cookies.set('token', token, {
                expires: 10, // 1 day
                // secure: true, // true in production
                // sameSite: 'strict', // Helps prevent CSRF attacks
            });
            Cookies.set('role', role, {
                expires: 10, // 1 day
                // secure: true, // true in production
                // sameSite: 'strict', // Helps prevent CSRF attacks
            });
            toast.success(res.data.message)
            dispatch(registerReducer(res.data))
            router.push(`/profile`, { scroll: false })
            dispatch(clearMessageReducer())
            dispatch(roleClearReducer());
            dispatch(emailClearReducer());

        } else {
            const error = res.error;
            const messageRes = error.data;
            toast.error(messageRes.error)
            dispatch(registerFailReducer(messageRes));
            dispatch(clearErrorReducer())
        }
    }

    const changeImageHandler = e => {
        const file = e.target.files[0];
        // console.log(file)
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        }
    }


    useEffect(() => {
        if (password != cpassword) {
            setIsProcced(false)
        }
        if (password === cpassword) {
            setIsProcced(true)
        }
    }, [cpassword, password])
    return (
        <>
            <Navbar />
            <div className={style.container} >

                <div className={style.signupCon}>

                    <form action="" className={style.form} onSubmit={submitHandler} >
                        <h1>Signup</h1>

                        <input placeholder="   name" name="name" type="text" required className={style.input} onChange={(e) => setName(e.target.value)} />

                        <input value={email} name="email" type="text" required className={style.input} disabled />
                        <input placeholder="   mobile number" name="phno" type="text" required className={style.input} onChange={(e) => setPhno(e.target.value)} />
                        <div className={style.inputPass}>
                            <input placeholder="   password" name="password" type={isShow ? "text" : "password"} required className={style.input} onChange={(e) => setPassword(e.target.value)} /> {isShow ? <FiEye onClick={showHandler} /> : <FiEyeOff onClick={showHandler} />}
                        </div>
                        <div className={style.inputPass}>
                            <input placeholder="   confirm password" name="cpassword" type={isCShow ? "text" : "password"} required className={style.input} onChange={(e) => setCpassword(e.target.value)} />{isCShow ? <FiEye onClick={cshowHandler} /> : <FiEyeOff onClick={cshowHandler} />}
                        </div>
                        {
                            !isProcced && (<p className={style.notMatch} >Password not match</p>)
                        }

                        <select name="school" onChange={(e) => setSchool(e.target.value)} className={style.input} required>
                            <option value={undefined}>Select Your School</option>
                            <option value="DBHS">DBHS</option>
                            <option value="VKV">VKV</option>
                            <option value="JNV">JNV</option>
                            <option value="KV">KV</option>
                        </select>
                        <input placeholder="   class" name="class" type="text" required className={style.input} onChange={(e) => setClass(e.target.value)} />


                        {
                            role === "student" ? (<>
                                <input placeholder="   subject" name="subject" type="text" required className={style.input} onChange={(e) => setSubject(e.target.value)} />
                                <input type="file" required placeholder="  payment screenshot" accept='image/*' name="file" className={style.input} onChange={changeImageHandler} />
                            </>) : (<>
                                <input placeholder="   specialized subject" name="subject" type="text" required className={style.input} onChange={(e) => setSubject(e.target.value)} />
                            </>)
                        }
                        {
                            imagePrev && (
                                <Image src={imagePrev} width={200} height={200} alt='preview' />
                            )}
                        <button type="submit" className={`${style.btn} ${!isProcced ? style.procced : null}`} >{
                            isLoading ? (<div className={style.btnLoading} >
                                <div className={style.wave}></div>
                                <div className={style.wave}></div>
                                <div className={style.wave}></div>
                                <div className={style.wave}></div>
                                <div className={style.wave}></div>
                                <div className={style.wave}></div>
                                <div className={style.wave}></div>
                                <div className={style.wave}></div>
                                <div className={style.wave}></div>
                                <div className={style.wave}></div>
                            </div>) : (<p>Signup</p>)
                        }</button>
                        <p>Already have an account? <br /> <Link href={"/login"} >Login</Link></p>
                    </form>
                </div>
            </div>
            <div className={style.footer}>
                <div className={style.linkContainer}>
                    <Link className={style.links} href="/login">Login</Link>
                    <Link className={style.links} href="/contact">Home</Link>
                    <Link className={style.links} href="/courses">Courses</Link>
                    <Link className={style.links} href="/about">About</Link>
                    <Link className={style.links} href="/contact">Contact</Link>
                </div>
                <h1 className={style.logoFooter}>
                    &#169; EduVerse
                </h1>
            </div>
        </>
    )
}

export default Page