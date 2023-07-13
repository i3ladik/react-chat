const { Router } = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user-controller.js');
const authMiddleware = require('../middlewares/auth-middleware.js');
const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/verify/:verif', userController.verify);
router.get('/refresh', userController.refresh);
router.get('/test', authMiddleware, userController.test);

module.exports = router;