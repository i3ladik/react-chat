const { validationResult } = require('express-validator');
const { wsSend } = require('../routes/ws-router.js');

const messageService = require('../services/message-service.js');
const ApiError = require('../exeptions/api-error.js');

class MessageController {
    async message(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(ApiError.BadRequest('Validation error: ', errors.array()));

            const { message } = req.body;
            const authorizationHeader = req.headers.authorization;
            const accessToken = authorizationHeader.split(' ')[1];

            
            const messageData = await messageService.message(message, accessToken);
            wsSend(messageData);
            return res.json({ message: 'Message successfully created.', ...messageData });

        }
        catch (e) { next(e); }
    }

    async getMessages(req, res, next) {
        try {
            const messages = await messageService.getMessages();
            return res.json(messages);
        }
        catch (e) { next(e); }
    }
}

module.exports = new MessageController();