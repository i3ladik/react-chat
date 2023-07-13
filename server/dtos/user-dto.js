module.exports = class UserDto {
    email;
    id;
    isVerif;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isVerif = model.isVerif;
    }
}