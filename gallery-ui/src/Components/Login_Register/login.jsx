import "./page.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import spinner from "../../Asset/Spinner-0.5s-164px.svg"
import ToastContext from "../Home/context/ToastContext";
const API =  process.env.REACT_APP_API  || "http://localhost:5000";

const LoginPage = () =>{
    const navigate = useNavigate("/")
    const {toast} = useContext(ToastContext)
    const [loading , setLoading] = useState(false) // for laoding spinner
    const [data , setData] = useState({  // for storing form data
        email:"",
        password:""    
    })
    const handleChange =(e)=>{              // storing Form Data
        const newData = {...data} 
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    const handleSubmit=(e)=>{                // sending the login credentials to backend
        e.preventDefault()
        setLoading(true)
        axios.post(API+"/login" , {
            email:data.email,
            password:data.password
        })
        .then((res)=>{
            setLoading(false)
            localStorage.setItem("token" , res.data.token)
            localStorage.setItem("name",res.data.name)
            navigate("/home")
            toast.success("Login Success")
        }).catch((e)=>{
            setLoading(false)
            toast.error(e.response.data)
        })

    }
    const handleRoute =()=>{        // routing to register page
        navigate("/register")
    }
    return (
        <div className="Container">
              {loading?<div className="spinner"><img src={spinner} alt="spinner"/></div>:''}
        <div className="innerBox">
        <form>
                <h1>User Login</h1>
                <input type={"email"}  id="email" value={data.email} onChange={(e)=>{handleChange(e)}} placeholder="Enter Email (Use: test@gmail.com)"/>
                <input type={"password"} id="password" value={data.password} onChange={(e)=>{handleChange(e)}} placeholder="Enter Password (Use: test123)"/>
                <button onClick={(e)=>{handleSubmit(e)}}>Sign-In</button>
                <p onClick={handleRoute}>Register As a new User?</p>
            </form>
        </div>
        </div>
    )
}

export default LoginPage;