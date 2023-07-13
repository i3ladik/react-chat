const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT, MONGOURL } = process.env;
const app = express();

(async () => {
    try {
        await mongoose.connect(MONGOURL, { dbName: 'chat' });

        app.listen(PORT, () => console.log(`Server started on ${PORT}`));
    }
    catch (e) {

    }
})();