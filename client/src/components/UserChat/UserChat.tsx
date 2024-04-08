import { ChatInput } from './ChatInput';
import { ChatDisplay } from './ChatDisplay';


export const UserChat = () => {

    return (
    <div className='w-full flex flex-col justify-between'>
        <ChatDisplay />
        <ChatInput />
    </div>  
    );
}

