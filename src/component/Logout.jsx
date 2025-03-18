import axios from "axios"
import "./Logout.css"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Logout(){
    const navigate =useNavigate()
    const logoutHandler = async()=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/logout`, {}, {withCredentials: true});
            toast.success(response.data.message);
            if(response.data.success){
                navigate("/")
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message)
        }
    }
    return(
        <button className="btn logout" onClick={logoutHandler}>Logout</button>
    )
}

export default Logout;