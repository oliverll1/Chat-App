import { useEffect, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatState } from '../../Context/ChatProvider';

export const ChatDisplay = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [messages, setMessages] = useState([]);
  const {user, selectedChat } = ChatState();

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
  
        console.log(data);
        setMessages(data);

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



  return (
    <div className='w-full flex flex-col justify-end flex-end bg-gray-300 h-full p-4'>
        {messages.map((message) => (
            <ChatBubble key={message._id} message={message.content}/>
        ))}
    </div>  
  )
}
