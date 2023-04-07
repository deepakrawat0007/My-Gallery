import axios from "axios";
import {useState , useContext} from "react";
import "../home.css"
import ToastContext from "../context/ToastContext";
const API =  process.env.REACT_APP_API  || "http://localhost:5000";
const DeletePrompt = ({Id , closePrompt}) =>{ // got the Id and Close Prompt func as prop
// console.log(Id)
const {toast} = useContext(ToastContext)
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
            toast.success("Image Deleted")
            closePrompt()
        }).catch((e)=>{
            // console.log(e.response)
            toast.error(e.response.data.message)
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