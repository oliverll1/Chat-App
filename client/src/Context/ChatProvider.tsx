import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { ReactNode } from 'react';
import { IChat } from "../types/types";

const ChatContext = createContext({});

interface ChatProviderProps {
    children: ReactNode
}

export const ChatProvider = ({ children }: ChatProviderProps) => {

    const [user, setUser] = useState<string | null>(null);
    const [selectedChat, setSelectedChat] = useState();
    const [notifications, setNotifications] = useState<string[]>([]);
    const [chats, setChats] = useState<IChat[]>([]);
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
  
        if (parsedUserInfo) {
            navigate("/chat");
            return;
        } 

        navigate("/");
       

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
