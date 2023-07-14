const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT, MONGOURL } = process.env;
const app = express();
const authRouter = require('./routes/auth-router.js');
const errorMiddleware = require('./middlewares/error-middleware.js');

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use(errorMiddleware);

(async () => {
    try {
        await mongoose.connect(MONGOURL, { dbName: 'chat' });

        app.listen(PORT, () => console.log(`Server started on ${PORT}`));
    }
    catch (e) {

    }
})();