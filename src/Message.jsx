import "./Message.css";
import {io} from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios"; 

const socket = io(`${import.meta.env.VITE_WEBSOCKET_URI}`, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
});

function Message({profile, receiverId, name, senderId }){

  // let [close, setClose] = useState(false)
  let [oldMessages, setOldMessage] = useState([]);
  let [sms, setSms] = useState("");

  // const closeHandler = ()=>{
  //   setClose(true);
  // };

  const smsHandler = (e)=>{
    setSms(e.target.value);
  }
  
  // --------------------------fetching Message from database
  useEffect(()=>{
    const getData = async ()=>{
      if(!senderId || !receiverId) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/messages/${senderId}/${receiverId}`);
        console.log(response);
        setOldMessage(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  },[receiverId, senderId])

  // -------------------------Websocket connection-------------------

  useEffect(()=>{
    if(!senderId) return;
    socket.connect();
    socket.emit("userOnline", senderId);
    socket.on("connect", ()=>{
      console.log("connected to sockeet", socket.id);
    })

    socket.on("receivedMessage", (messageData)=>{
      console.log("recieved: ", messageData)
      setOldMessage((curr)=>
        [...curr, messageData]
      )
    })

    return ()=> {
      socket.off("receivedMessage")
      socket.disconnect()
    };
  },[receiverId, senderId])

  const messageSendHandler = ()=>{
    if(sms.trim() !== ""){
      const messageData = {
        receiverId: receiverId,
        senderId: senderId,
        message: sms,
      }
      socket.emit("sendMessage", messageData);
      setOldMessage((curr)=>(
        [...curr, messageData]
      ))
      setSms("")
    }
  }
// ---------------------------------------------------------------------------------------------------------------------------------------------------

  return(
    <div className="main-container" >
      <div className="chat-head">
        <div className="img-name">
          <img src={profile} alt="profile" className="profile-picture" />
          <strong className="username">{name}</strong>
        </div>
        {/* <div className="close" onClick={closeHandler}>X</div> */}
      </div>
      <div className="msg-container">
        {
          oldMessages.map((message, idx)=>(
            <div className="chat-box" key={ idx }>
              <p className= {message.senderId.toString() === senderId.toString() ? "send" : "receive"}>{message.message}</p>
            </div>
          ))
        }
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="message">
        <textarea name="message" id="msg" placeholder="Enter message" onChange={smsHandler} value={sms}></textarea>
        <button type="submit" className="btn send-btn" onClick={messageSendHandler} >Send</button>
      </form>
    </div>
  );
}

export default Message;