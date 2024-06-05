import dotenv from "dotenv"
import app from "./app.js"
import {Server} from "socket.io"


dotenv.config({
    path:"./env"
})

const PORT=process.env.PORT || 6600

const server= app.listen(PORT,()=>{
                console.log(`server is running at port : http://localhost:${PORT}`);
            })


const io = new Server(server, {
            pingTimeout: 60000,
            cors: {
              origin: 'http://localhost:3000',
            },
          });
          
          io.on('connection', (socket) => {
            socket.on('setup', (userData) => {
              socket.join(userData.id);
              socket.emit('connected');
            });
          
            socket.on('join room', (room) => {
              socket.join(room);
            });
          
            socket.on('typing', (room) => socket.in(room).emit('typing'));
            socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));
          
            socket.on('new message', (newMessageRecieve) => {
              const chat = newMessageRecieve.chatId;
              if (!chat.users) console.log('chat.users is not defined');
              chat.users.forEach((user) => {
                if (user._id == newMessageRecieve.sender._id) return;
                socket.in(user._id).emit('message recieved', newMessageRecieve);
              });
            });
          });