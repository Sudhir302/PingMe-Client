import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Protected({children}){
    let [access, setAccess] = useState(false);
    let [loading, setLoading] = useState(true);

    useEffect(()=>{
        const handleLogin = async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/login`, {withCredentials: true});
                console.log(response);
                if(response.data.success === true){
                    setAccess(true);
                }
            } catch (error) {
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        }
        handleLogin();
    },[]);

    if(loading){
        return(
            <div>Loading....</div>
        )
    }

    return access ? children : <Navigate to = "/" />

}

export default Protected;