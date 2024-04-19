import { Socket } from "socket.io-client";

 export interface IFormErrors  {
    username: string,
    email: string,
    password: string
  }

export interface IMessage {
    _id: string;
    sender: string;
    content: string;
    chat: IChat;
    createdAt: string;
}

export interface IChat {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: IUser[];
    latestMessage: IMessage;
    groupAdmin: string;
}

export interface IUser {
    _id: string;
    token: string;
    username: string;
    email: string;
    password: string;
    profilePic: string;
}

export interface ChatStateProps { 
    user: IUser, 
    setSelectedChat: (chat:IChat) => void, 
    chats: IChat[], 
    setChats: (chats: IChat[]) => void, 
    socket: Socket, 
    sidebarRef: React.RefObject<HTMLDivElement> 
}
