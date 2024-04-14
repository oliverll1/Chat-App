import { useEffect, useState } from 'react';
import {
    Typography,
    ListItem,
    ListItemPrefix,
    Avatar
  } from "@material-tailwind/react";
import { Socket } from 'socket.io-client';


  interface ChatMenuItemProps {
    chat: any;
    accessChat: (userId: string) => void;
    user: any;
    socket: Socket
  }
  
export default function ChatMenuItem({chat, accessChat, user, socket}: ChatMenuItemProps) {

  const [newMessageReceived, setNewMessageReceived ] = useState(chat.latestMessage ? chat.latestMessage.content : '');
  
    const displayChatUser = chat.users.filter( (chatUser) => {
        return chatUser._id !== user._id;
    });

    useEffect(() => {


      // If a message is received and the selected chat is the same as the chat where the message is received then display the new message in the menu preview.
      const handleNewMessageReceived = (newMessage) => {
        if( newMessage.chat._id === chat._id )
          setNewMessageReceived(newMessage.content);
        };
    
        
      socket.on("message received", handleNewMessageReceived );
      socket.on("message sent", handleNewMessageReceived);

      return () => {
        socket.off("message received", handleNewMessageReceived);
        socket.off("message sent", handleNewMessageReceived);
      }
    }, [socket, newMessageReceived, chat._id]);

    return (
        <ListItem onClick={() => accessChat(chat.users[1]._id)}>
        <ListItemPrefix>
            <Avatar variant="circular" alt="alexander" src="https://docs.material-tailwind.com/img/face-2.jpg" />
        </ListItemPrefix>
        
        <div>
            <Typography variant="h6" color="blue-gray">
                {displayChatUser[0].username}
            </Typography>

            <Typography variant="small" color="gray" className="font-normal truncate max-w-[150px]">
              {newMessageReceived}
            </Typography>
        </div>                     
    </ListItem>
  )
}
