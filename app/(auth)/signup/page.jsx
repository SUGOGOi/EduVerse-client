"use client"
import Navbar from "@/components/navbar/Navbar"
import style from "./page.module.scss"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRegisterUserMutation } from "@/redux/apis/userApi"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { clearErrorReducer, clearMessageReducer, registerFailReducer, registerReducer } from "@/redux/reducers/userReducer"
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";

const Page = () => {
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phno, setPhno] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [school, setSchool] = useState("");
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

        const res = await registerUser({ formData });

        if ("data" in res) {
            toast.success(res.data.message)
            dispatch(registerReducer(res.data))
            setTimeout(() => {
                router.push('/profile', { scroll: false })
            }, 2000)
            dispatch(clearMessageReducer())

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
        <div className={style.container} >
            <Navbar />
            <div className={style.signupCon}>

                <form action="" className={style.form} onSubmit={submitHandler} >
                    <h1>Signup</h1>

                    <input placeholder="   name" name="name" type="text" required className={style.input} onChange={(e) => setName(e.target.value)} />

                    <input placeholder={`   email`} name="email" type="text" required className={style.input} onChange={(e) => setEmail(e.target.value)} />
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
                        <option value="">Select Your School</option>
                        <option value="DBHS">DBHS</option>
                        <option value="VKV">VKV</option>
                        <option value="JNV">JNV</option>
                        <option value="KV">KV</option>
                    </select>

                    <input type="file" required placeholder="  payment screenshot" accept='image/*' name="file" className={style.input} onChange={changeImageHandler} />
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
    )
}

export default Page