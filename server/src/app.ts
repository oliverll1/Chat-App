import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import { notFound } from './middleware/errorMiddleware';
import chatRoutes from './routes/chatRoutes';
import messageRoutes from './routes/messageRoutes';
import { IUser } from './models/User';


dotenv.config();
connectDB();
const port = process.env.PORT || 7000;

const app: Application = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
    socket.on('setup', (userData) => {
        if(!userData) {
            return;
        }

        socket.join(userData._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined room: ' + room);	
    });

    socket.on("typing", ({ roomId, username }) => {
      socket.to(roomId).emit("typing", { username });
    });

    socket.on("stop typing", (room) => {
      console.log("stop typing");
      socket.to(room).emit("stop typing");
    });



    socket.on("new message", (newMessage) => {
    const chat = newMessage.chat;
    const chatId = chat._id;

    if (!chat.users){
      console.log("chat.users not defined");
      return;
    } 

    chat.users.forEach((user: IUser) => {
      if (user._id === newMessage.sender._id) {
        socket.emit("message sent", newMessage);
      } else {
        socket.to(chatId).emit("message received",  newMessage);
      }
    });
});
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");

    });

    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    });
})


// Options
const corsOptions = {
    origin: process.env.ORIGIN_URL || 'http://localhost:3000'
}


// Middlewares
app.use(express.json()); 
app.use(cors(corsOptions));
app.use(logger('dev'));


// Routes 
app.get('/', (req, res) => {
    res.send('root')
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);


server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
