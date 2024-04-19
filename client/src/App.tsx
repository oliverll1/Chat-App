import {Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Chat from './Pages/Chat';

function App() {

  return (
    <main className='w-full flex h-full max-h-[95%]'>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<Chat/>}/>   
      </Routes>
    </main>  
  )
}

export default App
