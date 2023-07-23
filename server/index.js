const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT, MONGOURL } = process.env;
const app = express();
const authRouter = require('./routes/auth-router.js');
const messageRouter = require('./routes/message-router.js');
const errorMiddleware = require('./middlewares/error-middleware.js');
const { wsHandleUpgrade } = require('./routes/ws-router.js');

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());

//server
app.use('/api', messageRouter);
app.use('/api/auth', authRouter);

//websocket
app.get('/api/ws', (req, res) => {
    wsHandleUpgrade(req, req.socket, Buffer.alloc(0));
});

//client
if (process.env.NODE_ENV !== 'development') {
    process.env.CLIENT_URL = process.env.API_URL;
    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

app.use(errorMiddleware);

(async () => {
    try {
        await mongoose.connect(MONGOURL, { dbName: 'chat' });

        const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));

        server.on('upgrade', (req, socket, head) => {
            if (req.url === '/api/ws') wsHandleUpgrade(req, socket, head);
            else socket.destroy();
        });
    }
    catch (e) {

    }
})();