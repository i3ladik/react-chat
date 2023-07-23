const bcryptjs = require('bcryptjs');
const uuid = require('uuid');

const userModel = require('../models/user-model.js');
const mailService = require('../services/mail-service.js');
const tokenService = require('../services/token-service.js');
const UserDto = require('../dtos/user-dto.js');
const ApiError = require('../exeptions/api-error.js');

class UserService {
    async registration(email, password, nickname) {
        let checkUser = await userModel.findOne({ email });
        if (checkUser) throw ApiError.BadRequest(`User with email ${email} already exists`);
        checkUser = await userModel.findOne({ nickname });
        if (checkUser) throw ApiError.BadRequest(`User with nickname ${nickname} already exists`);

        const hashPassword = bcryptjs.hashSync(password);
        const verifLink = uuid.v4();
        const user = await userModel.create({ email, password: hashPassword, nickname, verifLink });
        await mailService.sendVerify(email, `${process.env.API_URL}/api/auth/verify/${verifLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async verificate(verifLink) {
        const checkUser = await userModel.findOne({ verifLink });
        if (!checkUser) throw ApiError.BadRequest('Bad verify link');

        checkUser.isVerif = true;
        await checkUser.save();
    }

    async login(email, password) {
        const checkUser = await userModel.findOne({ email });
        if (!checkUser) throw ApiError.BadRequest(`User with email ${email} does not exist`);

        const isPassValid = bcryptjs.compareSync(password, checkUser.password);
        if (!isPassValid) throw ApiError.BadRequest('Invalid password');

        const userDto = new UserDto(checkUser);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };

    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateRefreshToken(refreshToken);
        const dbToken = tokenService.findToken(refreshToken);
        if(!userData || !dbToken) throw ApiError.UnauthorizedError();

        const checkUser = await userModel.findById(userData.id);
        const userDto = new UserDto(checkUser);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };


    }
}

module.exports = new UserService();