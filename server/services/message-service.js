const messageModel = require('../models/message-model.js');
const tokenService = require('./token-service.js');
const MessageDto = require('../dtos/message-dto.js');

class MessageService {
    async message(message, token) {
        const userData = tokenService.validateAccessToken(token);
        const newMessage = await messageModel.create({ content: message, nickname: userData.nickname });
        const messageDto = new MessageDto(newMessage);
        return messageDto;
    }

    async getMessages() {
        const messages = await messageModel.find().limit(100);
        messages.forEach((msg, index) => messages[index] = new MessageDto(msg));
        return messages;
    }
}

module.exports = new MessageService();