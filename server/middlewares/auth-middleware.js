const ApiError = require('../exeptions/api-error.js');
const tokenService = require('../services/token-service.js');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) return next(new ApiError.UnauthorizedError());

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) return next(new ApiError.UnauthorizedError());

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) return next(new ApiError.UnauthorizedError());

        req.user = userData;
        next();
    }
    catch {
        return next(ApiError.UnauthorizedError());
    }
};