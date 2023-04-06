import axios from "axios";
import {useState} from "react";
import "../home.css"
const API =  process.env.REACT_APP_API  || "http://localhost:5000";
const DeletePrompt = ({Id , closePrompt}) =>{ // got the Id and Close Prompt func as prop
// console.log(Id)
const [data , setData] = useState({   //for storing the data
    password:""  
})

const handleChange = (e)=>{
    const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
}
    const handleSubmit=(e)=>{  // sending the request Backend to delete the image 
        e.preventDefault()
        // console.log(data.password)
        axios.delete(`${API}/delete/${Id}`, {
            data: { password: data.password },
            headers: { "authorization": localStorage.getItem("token") }
        })
        .then((res)=>{
            alert("Success")
            closePrompt()
        }).catch((e)=>{
            // console.log(e.response)
            alert(e.response.data.message)
        })
    }
return(
    <>
    <div className="innerBox">
        <form>
                <p>Are You sure want to delete the picture Permanently? </p>
                <input type="password"  id="password" value={data.password} onChange={(e)=>{handleChange(e)}} placeholder="Confirm Your Password"/>
                <button id="delete" onClick={(e)=>{handleSubmit(e)}}>Delete</button>
                <button onClick={closePrompt}>Cancel</button>
            </form>
        </div>
    
    </>
)
}

export default DeletePrompt