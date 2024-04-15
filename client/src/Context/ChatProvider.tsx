import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {

    const [user, setUser] = useState<string>();
    const [selectedChat, setSelectedChat] = useState<string>();
    const [notifications, setNotifications] = useState<string[]>([]);
    const [chats, setChats] = useState<string[]>([]);
    const sidebarRef = useRef(null);
    const socketUrl = import.meta.env.VITE_SOCKET_URL;

    const socket = io( socketUrl, {
        transports: ['websocket']
    });


    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        const parsedUserInfo: string = userInfo ? JSON.parse(userInfo) : null;
        setUser(parsedUserInfo);
  
        if (!parsedUserInfo) navigate("/");
    }, [navigate]);

    return (
        <ChatContext.Provider 
            value={{ 
                user, 
                setUser, 
                selectedChat, 
                setSelectedChat, 
                notifications, 
                setNotifications, 
                chats, 
                setChats,
                socket,
                sidebarRef
            }}>
            {children}
        </ChatContext.Provider>
    )
  
}

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;