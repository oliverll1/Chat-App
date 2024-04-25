import { ChatInput } from './ChatInput';
import { ChatDisplay } from './ChatDisplay';
import { useEffect, useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { ChatStateProps } from '../../types/types';

export const ChatScreen = () => {
    const [socketConnected, setSocketConnected] = useState(false);
    const {user, selectedChat, socket } = ChatState() as ChatStateProps;
    
    useEffect(() => {
        if(user){
            socket.emit("setup", user);	
            socket.on("connected", () => setSocketConnected(true));
        }
    },[user]);


    return (
    <div className='w-full flex flex-col justify-between h-full bg-white'>
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

