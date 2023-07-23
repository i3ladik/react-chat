const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    nickname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerif: { type: Boolean, default: false },
    verifLink: { type: String }
});

module.exports = model('User', UserSchema);