import { useState } from 'react'

import {Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Chat } from './Pages/Chat';

function App() {
  const [count, setCount] = useState(0);


  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </>
  )
}

export default App
