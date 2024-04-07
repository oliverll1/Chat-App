interface messageProps {
    message: string
}

export const ChatBubble = ({message}:messageProps) => {
    return (
      <div className='w-full flex h-fit justify-end mt-3'>
        <div className='max-w-[70%] flex bg-white rounded p-2'>
            {message}
        </div>  
      </div>  
    )
}
  