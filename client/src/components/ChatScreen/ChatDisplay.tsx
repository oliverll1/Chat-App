import { useEffect, useState } from "react";
import { ChatBubble } from "./ChatBubble";

import ScrollableFeed from 'react-scrollable-feed';
import { Socket } from "socket.io-client";
import { IChat, IMessage, IUser } from "../../types/types";

interface ChatDisplayProps {
  socket: Socket;
  selectedChat: IChat | null;
  user: IUser;
}

export const ChatDisplay = ({ socket, selectedChat, user}: ChatDisplayProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
        const config = {
            method: 'get',
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            }
          };
  
          const response = await fetch(`${apiUrl}/message/${selectedChat._id}`, config);
          const data = await response.json();
  
        setMessages(data);
        socket.emit("join chat", selectedChat._id);
      } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred");
        }
    }
  }

useEffect(() => {
  fetchMessages();
  // eslint-disable-next-line
}, [selectedChat]);


useEffect(() => {
  const handleMessages = (newMessage: IMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  socket.on("message received",handleMessages);
  socket.on("message sent", handleMessages);

  return () => {
    socket.off("message received", handleMessages);
    socket.off("message sent", handleMessages);
  };
}),[socket, messages];

  return (
    <div className='w-full flex h-full max-h-[95%] flex-col justify-end flex-end bg-gray-300 pb-8'>
          <ScrollableFeed className='w-full !h-auto  px-6'> {/* !h-auto --> overwrites inline height coming from the library */}
            <div className=" max-w-[1250px] m-auto">
              {messages.map((message) => (
                  <ChatBubble
                    key={message._id}
                    message={message.content}
                    userSent={user._id === message.sender._id ? true : false}
                  />
              ))}
            </div>
          </ScrollableFeed>
      
    </div>  
  )
}

export default ChatDisplay;
