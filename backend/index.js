const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = "648378633323-71p6o6pujc5feh1m8l30qb11l97chv5t.apps.googleusercontent.com"
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://localhost:3000", 
        methods: ["GET", "POST"],
    },
})

const users = [];
const secret = "secret"
app.use(express.json());
app.use(cors());

const client = new OAuth2Client(CLIENT_ID);

app.post("/google-login", async(req, res) => {
    const {token} = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        })

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
        res.status(200).json({ sessionToken, message: 'User authenticated successfully'});
    } catch (error) {
        console.error('Error during Google token verification:', error);
        res.status(403).json({ message: 'Invalid Google token' });
    }
});

io.on('connection', (socket)=> {
    console.log('A user connected', socket.id);
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`${socket.id} joined ${roomId}`);
    })

    socket.on('draw', (data, roomId) => {
        socket.to(roomId).emit("draw", data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

})

const PORT = 8080;
server.listen(PORT, () => console.log(`server is up on ${PORT}`));
