import { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";
import Message from "../../Message";
import Logout from "../Logout";

function Users() {
    let [users, setUsers] = useState([]);
    let [search, setSearch] = useState("");
    let [selectedUser, setSelectedUser] = useState(null);
    let [senderId, setSenderId] = useState("");
    let [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const searchHandler = (e) => {
        setSearch(e.target.value);
    };

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch users and sender ID
    useEffect(() => {
        const usersHandler = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/users`, { withCredentials: true });
                setUsers(response.data.allUsers);
                setSenderId(response.data.senderId);
            } catch (error) {
                console.error(error);
            }
        };

        usersHandler();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    const handleBack = () => {
        setSelectedUser(null);
    };

    return (
        <div className="chat-main-container">
            {/* Mobile View */}
            {isMobile && selectedUser ? (
                <div className="message-box full-screen">
                    <button className="back-btn" onClick={handleBack}>⬅ Back</button>
                    <Message
                        receiverId={selectedUser._id}
                        profile={selectedUser.profileImg}
                        name={selectedUser.username}
                        senderId={senderId}
                    />
                </div>
            ) : (
                <>
                    <div className="chat-container">
                        <div className="chats">
                            <h1 className="logo">Chats</h1>
                            <Logout />
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="search"
                                name="search"
                                id="search"
                                onChange={searchHandler}
                                value={search}
                                placeholder="Search for User"
                            />
                        </form>
                        <div className="users-container">
                            {filteredUsers.map((user) => (
                                <div
                                    className="users"
                                    key={user._id}
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <img
                                        src={user.profileImg}
                                        alt="profile"
                                        className="profile-picture"
                                    />
                                    <strong className="usename">{user.username}</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Message Box */}
                    <div className="message-box">
                        {selectedUser ? (
                            <Message
                                receiverId={selectedUser._id}
                                profile={selectedUser.profileImg}
                                name={selectedUser.username}
                                senderId={senderId}
                            />
                        ) : (
                            <div className="start-conversation">
                                Ping anyone from the Chat list. Start Chat now!!!
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Users;
