import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Image.css";
import axios from "axios";
import { toast } from "react-toastify";

function Image(){
    let [img, setImg]= useState(null);
    let [toggle, setToggle] = useState("none");
    let [imgLink, setImagelink] = useState(null);
    const {senderId} = useParams();

    const toggleHandler = ()=>{
        setToggle(toggle === "none" ? "flex" : "none");
    }

    const imgHandler = (e)=>{
        const file = e.target.files[0];
        if(file){
            setImagelink(file)
        }
    }

    console.log(senderId)

    const submitHandler = async(e)=>{
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("image", imgLink)
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/profile/image/${senderId}/update`, formData, {withCredentials: true});
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const getImage = async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/profile/image/${senderId}`)
                console.log(response)
                setImg(response.data.image)
            } catch (error) { 
                console.log(error);
            }
        }

        getImage();
    })
    return(
        <div className="img-container">
            <form className="img-form" onSubmit={submitHandler} style={{backgroundImage: `url(${img})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", display: toggle}} encType= "multipart/form-data" >

                <div className="layer">
                    {/* <label htmlFor="image">Update Profile</label> */}
                    <input type="file" name="image" id="image" accept="image/*" onChange={imgHandler} required />
                    <button type="submit" className="upload-btn">Upload</button>
                </div>

            </form>

            <img src= {img} alt="img" className="update-img" onClick={toggleHandler}/>

        </div>
    )
}

export default Image;