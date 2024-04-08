import React, { useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Input,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
 
export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const navigate =  useNavigate();
  const [userList, setUserList] = React.useState([]);

  const { 
    user,
    selectedChat,
    setSelectedChat,
    chats, 
    setChats 
} = ChatState();

 
  const handleOpen = (value) => {
    setOpen(open ? false : value);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  }

  const fetchChats = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    try {
        const config = {
          method: 'get',
          headers: {
              Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await fetch(`${apiUrl}/chat?userId=${user._id}`, config);
        const data = await response.json();

        setChats(data);
    }catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred");
        }
    }        
}

  const fetchUsers = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
        try {
          const config = {
              headers: {
                  Authorization: `Bearer ${user.token}`,
              },
          };
          const response = await fetch(`${apiUrl}/user`, config);
          const data = await response.json();

          setUserList(data);
      }catch (error: unknown) {
          if (error instanceof Error) {
              console.error(error.message);
          } else {
              console.error("An unknown error occurred");
          }
      }        
  }

  const accessChat = async (userId: string) => {
    const apiUrl = import.meta.env.VITE_API_URL;

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
  console.log(selectedChat);
  useEffect(() => {
    if(user){
        fetchUsers();
        fetchChats();
    }
  }, [user]);
  
 
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 h-screen">
      <div className="mb-2 flex items-center gap-4 p-4">
        <Typography variant="h5" color="blue-gray">
          Chat App
        </Typography>
      </div>

        <Tabs value="chats">
            <TabsHeader >
                <Tab value="chats">
                    Chats
                </Tab>
                <Tab value="users">
                    Users
                </Tab>        
            </TabsHeader>
            <TabsBody>
                <TabPanel value="chats">

                  <div className="p-2">
                    <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
                  </div>

                  <List>
                  {chats.map((chat) => (
                      <ListItem key={chat._id} onClick={() => accessChat(chat.users[1]._id)}>
                        {chat.chatName}
                      </ListItem>
                    ))} 
                  
                  </List>
                    
                </TabPanel>
                <TabPanel value="users">

                <div className="p-2">
                    <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
                  </div>


                <List>                
                  {userList.map((user) => (
                    <ListItem key={user._id} onClick={() => accessChat(user._id)}>
                      <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      {user.username}
                    </ListItem>
                  ))} 
                </List>
             
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
        {/* <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}
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