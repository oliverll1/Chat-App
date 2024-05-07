import React, { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { IUser } from '../../types/types';

import {
    List,
    ListItem,
    ListItemPrefix,
    Input,
    Avatar,
    Button,
  } from "@material-tailwind/react";

import {
    MagnifyingGlassIcon,
  } from "@heroicons/react/24/outline";


interface UserTabProps {
    user: IUser;
    accessChat: (userId: string) => void;
}

export const UserTab = ({user, accessChat}: UserTabProps) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [ keyword, setKeyword ] = useState('');
  const [searchText , setSearchText] = useState('');
  const requestUrl = `${apiUrl}/user/?search=${keyword}`;
  
  const { userList, isLoading } = useFetchData<IUser>(user, requestUrl, 'userList');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }

 const handleKeywordSearch = () => {
    setKeyword(searchText);
 }

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }


  return (
     <>
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
                onClick={handleKeywordSearch}
                size="sm"
                color={searchText ? "gray" : "blue-gray"}
                disabled={!searchText}
                className="!absolute right-0 top-0 rounded px-3 py-[0.55rem] rounded-tl-none rounded-bl-none"
            >
                <MagnifyingGlassIcon className="h-5 w-5" />
            </Button>                        
        </div>

        <List>                
            {
                Array.isArray(userList) ? userList.map((user: IUser) => (
                <ListItem key={user._id} onClick={() => accessChat(user._id)}>
                    <ListItemPrefix>
                        <Avatar variant="circular" alt="alexander" src="https://docs.material-tailwind.com/img/face-2.jpg" />
                    </ListItemPrefix>
                    {user.username}
                </ListItem>
                )) : null
            } 
        </List>       
    </>
  )
}

export default UserTab;
