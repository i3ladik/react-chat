const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    nickname: String,
    author: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

MessageSchema.index({ createdAt: -1 });

module.exports = model('Message', MessageSchema);