import { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify"


function Login(){
    const navigate = useNavigate();
    let [userDetails, setUserDetails] = useState({loginEmail: "", loginPassword: ""});

    const detailsHandler = (e)=>{
        setUserDetails((curr)=>({...curr, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/login`, userDetails, {withCredentials: true});
            toast.success(response.data.message);
            setUserDetails({loginEmail: "", loginPassword: ""});
            const userId = response.data.userId;
            navigate(`/users/${userId}`);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message)
        }
    }

    return(
        <div className="main-form-container">
            <div className='form-container'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <input type="email" name="loginEmail" id="loginEmail" placeholder='Registered Email' onChange={detailsHandler} value={userDetails.loginEmail} required/>
                    <input type="password" name="loginPassword" id="loginPassword" placeholder='Password' onChange={detailsHandler} value={userDetails.loginPassword} required/>
                    <button type="submit" className='submit-btn btn'>Login</button>
                </form>
                <hr />
                <div className="update-password ">
                    <Link to= "/update/Password" className='text-deco-none'>Forgot Password?</Link>
                </div>
                <button className="create-account signup-btn btn">
                    <Link to= "/signup" className='text-deco-none signup-btn '>Create Account</Link>
                </button>
            </div>
        </div>
    );
}

export default Login 