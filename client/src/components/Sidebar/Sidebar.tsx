import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

import { ChatStateProps } from "../../types/types";
import { UserTab } from "./UserTab";
import { ChatMenuTab } from "./ChatMenuTab";

export function Sidebar() {
  const navigate =  useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const { 
    user,
    setSelectedChat,
    chats, 
    setChats,
    socket,
    sidebarRef,
} = ChatState() as ChatStateProps;


  const logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  }

  const accessChat = async (userId: string) => {
    if (!user) {
      return;
    }

    try {
      const config = {
        method: 'post',
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId })
      };
      const response = await fetch(`${apiUrl}/chat`, config);
      const data = await response.json();

      if (!chats.find((chat) => chat._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);

     
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
          console.error("An unknown error occurred");
      }
    }
  };

  return (
    <Card 
      ref={sidebarRef} 
      className="rounded-none transition-all transform max-h-[95%] translate-x-[-100%] w-full h-full md:translate-x-0
      absolute max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 md:relative md:max-h-[100%] z-10"
    >

        <Tabs value="chats">
            <TabsHeader   
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }} 
            >
                <Tab value="chats">
                    Chats
                </Tab>
                <Tab value="users">
                    Users
                </Tab>        
            </TabsHeader>
            <TabsBody>
                <TabPanel value="chats">
                    <ChatMenuTab user={user} accessChat={accessChat} chats={chats} socket={socket} setChats={setChats} />
                </TabPanel>
                <TabPanel value="users">
                    <UserTab user={user} accessChat={accessChat} />
                </TabPanel>
            </TabsBody>
        </Tabs>

      <hr className="my-2 border-blue-gray-50" />
      
      <List>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem onClick={logout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
