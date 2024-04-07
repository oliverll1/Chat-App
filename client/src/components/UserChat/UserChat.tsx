import { ChatInput } from './ChatInput';
import { ChatDisplay } from './ChatDisplay';
import { useEffect, useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';


export const UserChat = () => {
    const [loggedUser, setLoggedUser] = useState({});

    return (
    <div className='w-full flex flex-col justify-between'>
        <ChatDisplay />
        <ChatInput />
    </div>  
    );
}

