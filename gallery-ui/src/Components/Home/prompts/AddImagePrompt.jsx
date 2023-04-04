import { useState } from "react";
import axios from "axios";
import spinner from "../../../Asset/Spinner-0.5s-164px.svg"
const API = "http://localhost:5000" || process.env.REACT_APP_API;


const AddImagePrompt = ({closePrompt}) =>{ // revecive the closePrompt func as a prop
    const [loading , setLoading] = useState(false) // for laoding spinner
    const [data , setData] = useState({   //for storing the data
        label:"",
        image:""    
    })

     const handleChange =(e)=>{           // storing the data
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    const handleSubmit=(e)=>{    // sending request to backend to add new Image
        e.preventDefault()
        setLoading(true)
        axios.post(API+"/add" , {
            label:data.label,
            image:data.image
        },{headers:{"authorization":localStorage.getItem('token')}})
        .then((res)=>{
            setLoading(false)
            alert("Success")
            closePrompt()
        }).catch((e)=>{
            setLoading(false)
            alert(e.response.data.message)
            // console.log(e.response)
        })

    }
return(
    <>
    {loading?<div className="spinner"><img src={spinner} alt="spinner"/></div>:''}
    <div className="innerBox">
        <form>
                <h1>Add Image</h1>
                <input type={"text"}  id="label" value={data.label} onChange={(e)=>{handleChange(e)}} placeholder="Enter label"/>
                <input type={"text"} id="image" value={data.image} onChange={(e)=>{handleChange(e)}} placeholder="Enter image Link"/>
                <button onClick={(e)=>{handleSubmit(e)}}>Add Image</button>
                <button onClick={closePrompt}>Cancel</button>
            </form>
        </div>
    
    </>
)
}
export default AddImagePrompt