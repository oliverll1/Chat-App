import { Socket } from "socket.io-client";
import useFetchData from "../../hooks/useFetchData";
import { IChat, IUser } from "../../types/types";
import ChatMenuItem from "./ChatMenuItem";
import {
    List,
  } from "@material-tailwind/react";

interface ChatMenuTabProps {
    chats: IChat[];
    accessChat: (userId: string) => void;
    user: IUser;
    socket: Socket;
    setChats: (chats: IChat[]) => void;
}

export const ChatMenuTab = ({chats, accessChat, user, socket, setChats }: ChatMenuTabProps) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const requestUrl = `${apiUrl}/chat?userId=${user?._id}`;
   
    const { isLoading } = useFetchData(user, requestUrl, 'chatData', setChats);

    if(isLoading || !user) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <List>
            {chats.map((chat) => {         
                return (
                    <ChatMenuItem 
                        key={chat._id} 
                        chat={chat} 
                        accessChat={accessChat} 
                        user={user} 
                        socket={socket}
                    />
                )         
            })}
        </List>                
    )
}

export default ChatMenuTab;
