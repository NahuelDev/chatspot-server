import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from "http";
import tokenRouter from './routers/tokenRouter.js';
import roomsRouter from './routers/roomsRouter.js';
import { addUser } from './user.js';
import { addRoom, rooms } from './room.js';
import { randomUUID } from 'crypto';


dotenv.config();

const app = express();
const PORT = 8080;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on("connection", (socket) => {
    console.log('A Connection has been made');

    socket.on('disconnect', () => {
        console.log('A disconnection has been made')
    });

    socket.on("join", ({ userData, room }) => {

        const newUser = userData;
        newUser.room = room.id;

        const user = addUser(newUser);
        const alreadyExists = addRoom(room);

        const [oldRoom] = socket.rooms;
        socket.leave(oldRoom);
        socket.join(room.id);

        socket.broadcast.to(oldRoom).emit("message", {
            user: "Admin",
            text: `${user.username} has left!`,
            id: randomUUID()
        })

        socket.broadcast.to(room.id)
            .emit("message", {
                user: "Admin",
                text: `${user.username} has joined!`,
                id: randomUUID()
            });

        // Set room 
        socket.emit("setRoom", room);

        if (!alreadyExists) {
            io.emit("newRoom", rooms);
        }

        socket.emit("message", {
            user: "Admin",
            text: `Welcome to ${room.name} - ${room.album}`,
            id: randomUUID()
        });

    });

    socket.on("sendMessage", ({ message, username, profileImage, roomID }) => {
        io.to(roomID).emit("message", {
            user: username,
            text: message,
            profileImage,
            id: randomUUID()
        });
    });


});

app.use(cors());
app.use(express.json());

//Routers
app.use("/api/token", tokenRouter);
app.use("/api/rooms", roomsRouter);

app.get('/', (req, res) => {
    console.log('/ PATH');
    res.end();
})

server.listen(PORT, () => {
    console.log(`Server UP! :^) at port: ${PORT}`);
})