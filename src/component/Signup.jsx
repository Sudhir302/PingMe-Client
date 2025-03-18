import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Signup.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
 

function Signup(){
    const navigate = useNavigate();
    let [userDetails, setUserDetails] = useState({userName: "", signupEmail: "", signupPassword: ""});

    const detailsHandler = (e)=>{
        setUserDetails((curr)=>(
            {...curr, [e.target.name] : e.target.value}
        ))
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/signup`, userDetails, {withCredentials: true});
            toast.success(response.data.message);
            setUserDetails({userName: "", signupEmail: "", signupPassword: ""});
            navigate("/")
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.message)
        }
    }

    return(
        <div className="main-form-container">
        <div className='form-container'>
            <form className='signup-form' onSubmit={submitHandler}>
                <input type="text" name="userName" id="userName" placeholder='Enter Your Username' onChange={detailsHandler} value={userDetails.userName} required />
                <input type="email" name="signupEmail" id="signupEmail" placeholder='Enter Your Email' onChange={detailsHandler} value={userDetails.signupEmail} required/>
                <input type="password" name="signupPassword" id="signupPassword" placeholder='Set Your Password' onChange={detailsHandler} value={userDetails.signupPassword} required/>
                <button type="submit" className='submit-btn btn'>Sign up</button>
            </form> 
            <hr />
            <button className="create-account signup-btn btn">
                <Link to= "/" className='text-deco-none signup-btn '>Already Have Account</Link>
            </button>
        </div>
    </div>
    );
}

export default Signup;