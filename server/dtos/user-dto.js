module.exports = class UserDto {
    email;
    nickname;
    id;
    isVerif;

    constructor(model) {
        this.email = model.email;
        this.nickname = model.nickname;
        this.id = model._id;
        this.isVerif = model.isVerif;
    }
}