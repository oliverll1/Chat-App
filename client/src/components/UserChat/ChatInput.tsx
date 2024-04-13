import { Textarea, IconButton } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatInputProps {
  socket: Socket;
  socketConnected: boolean;
  selectedChat: any;
  user: any;
}

export function ChatInput({ socket, socketConnected, user, selectedChat }: ChatInputProps) {
  const [messageText , setMessageText] = useState('');
  const [isTypingMessage, setIsTypingMessage] = useState<string>('');
  const apiUrl = import.meta.env.VITE_API_URL;
  const typingTimeoutRef = useRef<number | null>(null);

  const sendMessage = async (message: string): Promise<void> => {
      if(!selectedChat) {
          console.log("no chat selected");
          return;
      }

      if(!message) {
          return;
      }

      // Make sure to stop typing when sending message
      socket.emit("stop typing", selectedChat._id);

      try {
        const config = {
          method: 'post',
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
              content: message,
              chatId: selectedChat._id,
            }),
        };

        const response = await fetch(`${apiUrl}/message`, config);
        const data = await response.json();

        socket.emit("new message", data);
        setMessageText('');
         

      } catch (error: unknown) {
          if (error instanceof Error) {
              console.error(error.message);
          } else {
              console.error("An unknown error occurred");
          }
      }        
  }


  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    
    if(!selectedChat) {
      return;
    }

    setMessageText(event.target.value);
    if (!socketConnected) return;

    socket.emit("typing", { roomId: selectedChat._id, username: user.name });
    const timerLength = 3000;
    
  
    // Clear previous timer if it exists
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop typing", selectedChat._id);
      setIsTypingMessage('');
    }, timerLength);
  }


// Listen for "typing" and "stop typing" events
useEffect(() => {
  socket.on("typing", ({ username }) => setIsTypingMessage(`${username} is typing...`));

  
  socket.on("stop typing", () => setIsTypingMessage(''));

  return () => {
    setIsTypingMessage('');
    socket.off("typing");
    socket.off("stop typing");
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedChat]);


  return (
    <div className="flex w-full max-h-[7%] h-full flex-row items-center gap-2 rounded-[5px] border border-gray-900/10 bg-white-900/5">
      {isTypingMessage && <p className='text-xs text-gray-500 absolute mt-[-7rem] ml-3'>{isTypingMessage}</p>}
      <div className="flex">
        {/* <IconButton variant="text" className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </IconButton> */}
        <IconButton variant="text" className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        </IconButton>
      </div>
      <Textarea
        rows={2}
        value={messageText}
        onChange={(e) => handleChange(e)}
        placeholder="Your Message"
        className="min-h-full !border-0 focus:border-transparent"
        containerProps={{
          className: "grid h-full",
        }}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <div>
        <IconButton variant="text" className="rounded-full" onClick={() => sendMessage(messageText)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
