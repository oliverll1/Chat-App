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


dotenv.config();
connectDB();
const port = process.env.PORT || 7000;

const app: Application = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    });
})


// Options
const corsOptions = {
    origin: 'http://localhost:3000'
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
// app.use("/api/message", messageRoutes);

app.use(notFound);


server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
