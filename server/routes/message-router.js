const { Router } = require('express');
const { body } = require('express-validator');

const messageController = require('../controllers/message-controller.js');
const authMiddleware = require('../middlewares/auth-middleware.js');
const router = new Router();

router.post('/message',
    authMiddleware,
    body('message').isLength({ min: 1, max: 512 }),
    messageController.message
);
router.get('/messages', messageController.getMessages);

module.exports = router;