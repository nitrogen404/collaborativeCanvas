const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = "648378633323-71p6o6pujc5feh1m8l30qb11l97chv5t.apps.googleusercontent.com";
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const users = [];
const secret = "secret";
app.use(express.json());
app.use(cors());

const client = new OAuth2Client(CLIENT_ID);
const usersinRoom = {};

app.post("/google-login", async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];

        let user = users.find((user) => user.googleId === userId);
        if (!user) {
            user = {
                googleId: userId,
                email: payload.email,
                name: payload.name,
            };
            users.push(user);
        }
        const sessionToken = jwt.sign({ userId }, secret, { expiresIn: '1h' });
        res.status(200).json({ sessionToken, message: 'User authenticated successfully' });
    } catch (error) {
        console.error('Error during Google token verification:', error);
        res.status(403).json({ message: 'Invalid Google token' });
    }
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('joinRoom', (roomId, userData) => {
        socket.join(roomId);
        usersinRoom[socket.id] = {
            roomId,
            ...userData,
            point: {
                x: userData.point?.x || 0,
                y: userData.point?.y || 0,
            },
        };

        const otherUsers = Object.keys(usersinRoom)
            .filter(id => id !== socket.id && usersinRoom[id].roomId === roomId)
            .map(id => ({
                id,
                user: usersinRoom[id].name,
                point: usersinRoom[id].point,
            }));

        socket.emit('existingCursors', otherUsers);

        io.to(roomId).emit('updateCursor', {
            id: socket.id,
            point: usersinRoom[socket.id].point,
            user: userData.name,
        });

        console.log(`${socket.id} joined ${roomId}`, usersinRoom[socket.id]);
    });

    socket.on('cursorMove', (point) => {
        const user = usersinRoom[socket.id];
        if (user) {
            user.point = point;
            const { roomId } = user;
            socket.to(roomId).emit('updateCursor', {
                id: socket.id,
                point,
                user: user.name,
            });
        }
    });

    socket.on('draw', (data, roomId) => {
        socket.to(roomId).emit("draw", data);
    });

    socket.on('clearCanvas', (roomId) => {
        io.to(roomId).emit('clearCanvas');
    });

    socket.on('disconnect', () => {
        const user = usersinRoom[socket.id];
        if (user) {
            const { roomId } = user;
            socket.to(roomId).emit('removeCursor', socket.id);
            delete usersinRoom[socket.id];
        }
        console.log(`${socket.id} disconnected from ${roomId}`);
    });
});

const PORT = 8080;
server.listen(PORT, () => console.log(`server is up on ${PORT}`));
