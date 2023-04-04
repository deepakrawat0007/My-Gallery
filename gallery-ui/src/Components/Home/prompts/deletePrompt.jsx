import axios from "axios";
const API =  process.env.REACT_APP_API  || "http://localhost:5000";
const DeletePrompt = ({Id , closePrompt}) =>{ // got the Id and Close Prompt func as prop
// console.log(Id)
    const handleSubmit=(e)=>{  // sending the request Backend to delete the image 
        e.preventDefault()
        axios.delete(`${API}/delete/${Id}`, {headers:{"authorization":localStorage.getItem('token')}})
        .then((res)=>{
            alert("Success")
            closePrompt()
        }).catch((e)=>{
            alert(e.response.data.message)
        })
    }
return(
    <>
    <div className="innerBox">
        <form>
                <p>Are You sure want to delete the picture Permanently? </p>
                <button onClick={(e)=>{handleSubmit(e)}}>Delete</button>
                <button onClick={closePrompt}>Cancel</button>
            </form>
        </div>
    
    </>
)
}

export default DeletePrompt