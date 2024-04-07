import { ChatBubble } from "./ChatBubble";

export const ChatDisplay = () => {
    return (
      <div className='w-full flex flex-col justify-end flex-end bg-gray-300 h-full p-4'>

         <ChatBubble message="Hello, how are you?"/>
         <ChatBubble message="I am fine. What about you?"/>   
         <ChatBubble message="Lorem ipsum dolor sit amet consectetur adipisicing elit. "/>
         <ChatBubble message="Lorem ipsum dolor sit amet consectetur adipisicing elit. "/>
         <ChatBubble message="Lorem ipsum dolor sit amet consectetur adipisicing elit. "/>
      </div>  
    )
}
  