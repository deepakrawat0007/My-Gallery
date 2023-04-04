import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddImagePrompt from "./prompts/AddImagePrompt";
import "./home.css";
import axios from "axios";
import DeletePrompt from "./prompts/deletePrompt";
import spinner from "../../Asset/Spinner-0.5s-164px.svg"
const API = "http://localhost:5000" || process.env.REACT_APP_API;

const HomePage = () => {
    const [loading , setLoading] = useState(true) // for laoding spinner
    const [AddPrompt, setAddPrompt] = useState(false) //Add Image Prompt
    const [DelPrompt, setDelPrompt] = useState(false) // Delete Prompt
    const [search, setSearch] = useState(false) // Search
    const [name, setName] = useState("") // setting name for Search
    const [Id, setId] = useState()          // for setting Id to pass prop
    const [Images, setImages] = useState([]) // for storing all Images
    const [filteredImage, setFilterImage] = useState([]) // for storing Filtered Images
    const navigate = useNavigate("")

    const APICall = async () => { //for fetching All Images from Database
        await axios.get(API + "/allImage", { headers: { "authorization": localStorage.getItem('token') } })
            .then((res) => {
                // console.log(res.data.Images)
                setImages(res.data.Images)
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                alert(e.response.data)
            })
    }

    useEffect(() => { // for Checking token Exist or Not 
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
        APICall()
    }, [])

    const logout = () => { // clearing Token after Logout So User Wont able to come back Until logs In again
        localStorage.clear()
        navigate("/ ")
    }
    const handleRemove = (id) => { //setting Id in a state to send as a prop
        // console.log(id)
        setId(id)
        setDelPrompt(true)
    }
    const handleSearch = () => { // searching for the name of Image
        setSearch(true)
        const filterList = Images.filter(items => items.label.toLowerCase().includes(name.toLowerCase()))
        setFilterImage(filterList)
    }

    const handlePrompt = () => { //setting Propmt true to show the prompt
        setAddPrompt(true)
    }
    const closePrompt = () => { // function for passing as a prop to close the prompt
        APICall()
        setAddPrompt(false)
        setDelPrompt(false)
    }

    return (
        <>
         {loading?<div className="spinner"><img src={spinner} alt="spinner"/></div>:''}
            <div className="header">
                <div><span class="material-icons md-24">face</span></div>
                <div><span>{localStorage.getItem("name")}</span></div>
                <div><input type="text" placeholder="Search Name" onChange={(e) => setName(e.target.value)} /><button onClick={handleSearch}><span class="material-symbols-outlined">
                    search
                </span></button></div>
                <div><button onClick={handlePrompt}>Add a photo</button></div>
                <div><button onClick={logout}><span class="material-symbols-outlined">logout</span></button></div>
            </div>
            <div className="prompt">
                {AddPrompt && <AddImagePrompt closePrompt={closePrompt} />}
                {DelPrompt && <DeletePrompt Id={Id} closePrompt={closePrompt} />}
            </div>
            {!search ? (<div className="container">
                {Images?.map((items, idx) => (
                    <div className="figure" key={idx}>
                        <img src={items.image} alt={items.label} />
                        <div className="data-container">
                            <div className="del"><button onClick={() => { handleRemove(items._id) }}>Delete</button></div>
                            <div className="name" >{items.label}</div>
                        </div>
                    </div>
                ))}
            </div>) : (<div className="container">
                {filteredImage?.map((items, idx) => (
                    <div className="figure" key={idx}>
                        <img src={items.image} alt={items.label} />
                        <div className="data-container">
                            <div className="del"><button onClick={() => { handleRemove(items._id) }}>Delete</button></div>
                            <div className="name" >{items.label}</div>
                        </div>
                    </div>
                ))}
            </div>)}

        </>
    )
}

export default HomePage;