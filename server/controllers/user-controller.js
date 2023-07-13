const { validationResult } = require('express-validator');

const userService = require('../services/user-service.js');
const ApiError = require('../exeptions/api-error.js');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(ApiError.BadRequest('Validation error: ', errors.array()));

            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);

        }
        catch (e) { next(e); }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) { next(e); }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }
        catch (e) { next(e); }
    }

    async verify(req, res, next) {
        try {
            const verifLink = req.params.verif;
            await userService.verificate(verifLink);
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (e) { next(e); }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) { next(e); }
    }

    async test(req, res, next) {
        try {
            res.json([1, 2, 3]);
        }
        catch (e) { next(e); }
    }
}

module.exports = new UserController();