const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());

// Socket.io connection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Define Routes
app.use('/api/auth', require('./src/api/auth.route'));
app.use('/api/admin/members', require('./src/api/member.route'));
app.use('/api/admin/packages', require('./src/api/package.route'));
app.use('/api/users', require('./src/api/user.route'));
app.use('/api/checkin', require('./src/api/checkin.route'));
app.use('/api/bookings', require('./src/api/booking.route'));
app.use('/api/admin/statistics', require('./src/api/statistics.route'));


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { io };