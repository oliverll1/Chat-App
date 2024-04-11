import { ChatInput } from './ChatInput';
import { ChatDisplay } from './ChatDisplay';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';

export const UserChat = () => {
    const [socketConnected, setSocketConnected] = useState(false);
    const socketUrl = import.meta.env.VITE_SOCKET_URL;
    const {user, selectedChat } = ChatState();
    const socket = io( socketUrl, {
        transports: ['websocket']
    });


    useEffect(() => {
        if(user){
            socket.emit("setup", user);	
            socket.on("connected", () => setSocketConnected(true));
            console.log('connected to socket ' + socketConnected);
        }   
    },[user]);


    return (
    <div className='w-full flex flex-col justify-between'>
        <ChatDisplay 
            socket={socket} 
            user={user}
            selectedChat={selectedChat} 
        />
        <ChatInput 
            socket={socket} 
            user={user}
            selectedChat={selectedChat}
            socketConnected={socketConnected}
        />
    </div>  
    );
}

