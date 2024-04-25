interface messageProps {
    message: string,
    userSent: boolean
}

export const ChatBubble = ({message, userSent}:messageProps) => {
    return (
      <div className={`w-full flex h-fit ${userSent ? 'justify-end': 'justify-start'} mt-3`}>
        <div className={`max-w-[65%] flex ${userSent ? 'bg-white text-black' : 'bg-gray-900 text-white'  }  rounded p-2`}>
            {message}
        </div>  
      </div>  
    )
}
  