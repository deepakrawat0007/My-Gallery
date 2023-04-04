import "./page.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import spinner from "../../Asset/Spinner-0.5s-164px.svg"
const API = "http://localhost:5000" || process.env.REACT_APP_API;

const RegisterPage = () =>{
    const navigate = useNavigate("/")
    const [loading , setLoading] = useState(false) // for laoding spinner
    const [data , setData] = useState({  //for storing form data
        name:"",
        email:"",
        password:""    
    })
    const handleChange =(e)=>{         // storing form data
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    const handleSubmit=(e)=>{            // sending data to backend
        e.preventDefault()
        setLoading(true)
        axios.post(API+"/registration" , {
            name:data.name,
            email:data.email,
            password:data.password
        })
        .then((res)=>{
            alert("Registration Success")
            navigate("/")
            setLoading(false)
        }).catch((e)=>{
            setLoading(false)
            alert(e.response.data)
            
        })

    }
    const handleRoute =()=>{    // routing to login page
        navigate("/")
    }
    return (
        <div className="Container">
            {loading?<div className="spinner"><img src={spinner} alt="spinner"/></div>:''}
        <div className="innerBox">
        <form>
                <h1>User Register</h1>
                <input type={"text"}  id="name" value={data.name} onChange={(e)=>{handleChange(e)}} placeholder="Enter Name"/>
                <input type={"email"}  id="email" value={data.email} onChange={(e)=>{handleChange(e)}} placeholder="Enter Email"/>
                <input type={"password"} id="password" value={data.password} onChange={(e)=>{handleChange(e)}} placeholder="Enter Password"/>
                <button onClick={(e)=>{handleSubmit(e)}}>Sign-Up</button>
                <p onClick={handleRoute}>Already Registered Login?</p>
            </form>
        </div>
        </div>
    )
}

export default RegisterPage;