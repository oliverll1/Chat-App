import { Sidebar } from '../components/Sidebar';
import { UserChat } from '../components/UserChat/UserChat';

export const Chat = () => {
  return (
    <main className='w-full flex h-screen'>
      <Sidebar />
      <UserChat />
    </main>  
  )
}
