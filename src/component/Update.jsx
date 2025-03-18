import { Link } from "react-router-dom";
import axios from "axios"
import "./Update.css"
import { useState } from "react";
import { toast } from "react-toastify";


function UpdatePassword(){

    let [userDetails, setUserDetails] = useState({loginEmail: "", newPassword: ""});
    const detailsHandler = (e)=>{
        setUserDetails((curr)=>(
            {...curr, [e.target.name]: e.target.value}
        ))
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/update/password`, userDetails, {withCredentials: true})
            toast.success(response.data.message);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }

    return(
        <div className="main-form-container">
            <div className='form-container'>
                <form className='update-form' onSubmit={submitHandler}>
                    <input type="email" name="loginEmail" id="loginEmail" placeholder='Registered Email' onChange={detailsHandler} value={userDetails.loginEmail} required/>
                    <input type="password" name="newPassword" id="newPassword" placeholder='Update Password' onChange={detailsHandler} value={userDetails.newPassword} required/>
                    <button type="submit" className='submit-btn btn'>Update</button>
                </form>
                <hr />
                <div className="update-password ">
                    <Link to= "/" className='text-deco-none'>Already Have Account?</Link>
                </div>
                <button className="create-account signup-btn btn">
                    <Link to= "/signup" className='text-deco-none signup-btn '>Create Account</Link>
                </button>
            </div>
        </div>
    )
}

export default UpdatePassword;