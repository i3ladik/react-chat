module.exports = class MessageDto {
    content;
    nickname;
    createdAt;

    constructor(model) {
        this.content = model.content;
        this.nickname = model.nickname;
        this.createdAt = model.createdAt;
    }
}