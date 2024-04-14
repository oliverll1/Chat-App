import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Avatar,
  Button,
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
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";


import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import ChatMenuItem from "./ChatMenuItem";

 
export function Sidebar() {
  const [open, setOpen] = useState(0);
  const navigate =  useNavigate();
  const [userList, setUserList] = useState([]);
  const [searchText , setSearchText] = useState('');

  const { 
    user,
    setSelectedChat,
    chats, 
    setChats,
    socket,
} = ChatState();

 // TODO: Hamburger Menu
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

  const fetchUsers = async (keyword: string = '') => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
        try {
          const config = {
              method: 'get',
              headers: {
                  Authorization: `Bearer ${user.token}`,
              },
          };
          const response = await fetch(`${apiUrl}/user/?search=${keyword}`, config);
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


  const handleSearch = (event) => {
    setSearchText(event.target.value);
  }


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
                  <List>
                    {chats.map((chat) => {
                      
                      return <ChatMenuItem 
                        key={chat._id} 
                        chat={chat} 
                        accessChat={accessChat} 
                        user={user} 
                        socket={socket}
                      />
                    
                    })}
                  </List>                    
                </TabPanel>
                
                <TabPanel value="users">

                <div className="relative flex w-full label:border-sky-100">
                    <Input
                        label="Search User"
                        value={searchText}
                        onChange={handleSearch}
                        className="pr-25 "
                        containerProps={{
                          className: "min-w-0",
                        }}
                    />

                    <Button
                      onClick={ () => fetchUsers(searchText) }
                      size="sm"
                      color={searchText ? "gray" : "blue-gray"}
                      disabled={!searchText}
                      className="!absolute right-0 top-0 rounded px-3 py-[0.55rem] rounded-tl-none rounded-bl-none"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </Button>                        
                </div>

                <List>                
                  {userList.map((user) => (
                    <ListItem key={user._id} onClick={() => accessChat(user._id)}>
                      <ListItemPrefix>
                         <Avatar variant="circular" alt="alexander" src="https://docs.material-tailwind.com/img/face-2.jpg" />
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