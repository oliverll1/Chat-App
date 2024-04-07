import io from 'socket.io-client';
import { AuthenticationForm } from '../components/AutheticationForm/AuthenticationForm';

export const Home = () => {

 // connection test
  const socket = io('127.0.0.1:7000/',{
    transports: ['websocket']
});

socket.on('connect', () => {
    console.log('Connected to server');
});

// Handle events from the server
socket.on('message', (data) => {
console.log('Received message from server:', data);
});

// Send data to the server
socket.emit('sendMessage', 'Hello from client');

  return (
    <main className='w-full flex justify-center'>
      <AuthenticationForm />
    </main>   
  )
}
