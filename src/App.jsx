import Login from "./component/Login";
import Image from "./component/Dash & comp/Image";
import UpdatePassword from "./component/Update";
import Protected from "../utils/Protected";
import Signup from "./component/Signup";
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Users from "./component/Dash & comp/Users";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./Media.css"
import Nopage from "./Nopage";


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element= {<Signup />} />
        <Route path="/update/password" element = {<UpdatePassword />} />
        <Route path = "*" element = {<Nopage />} />
        <Route path="/users/:senderId" element= {<Protected><Users /></Protected>} />
      </Routes>
      <ToastContainer position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
    </BrowserRouter>
  )
}

export default App;