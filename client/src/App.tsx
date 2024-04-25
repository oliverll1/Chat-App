import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./Pages/Home'));
const Chat = React.lazy(() => import('./Pages/Chat'));

function App() {

  return (
    <main className='w-full flex h-full max-h-[93%] bg-white'>
       <Routes>
        <Route path="/" element={<React.Suspense fallback={<div>Loading...</div>}>
          <Home/>
        </React.Suspense>}/>
        
        <Route path="/chat" element={<React.Suspense fallback={<div>Loading...</div>}>
          <Chat/>
        </React.Suspense>}/>   
      </Routes>
    </main>  
  )
}

export default App
