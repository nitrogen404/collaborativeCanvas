const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

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

// signup
app.post('/signup', async(req, res) => {
    const {username, password} = req.body;
    const existingUser = users.find(user => user.username === username);
    if (existingUser) return res.status(400).json({message: 'User already exists'});
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {id: users.length + 1, username, password: hashedPassword};
    users.push(newUser);
    res.status(201).json({message: "New user created"})
});

app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    console.log(username)
    const user = users.find(user => user.username === username)
    if (!user) return res.status(401).json({message: "Invalid credentials"});
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({message: "Invalid pasword"});

    const token = jwt.sign({id: user.id, username: user.username,}, secret, {expiresIn: '1h'})
    res.json(token);
});

io.on('connection', (socket)=> {
    console.log('A user connected');

    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

})

const PORT = 8080;
server.listen(PORT, () => console.log("server is up on ${PORT}"));
