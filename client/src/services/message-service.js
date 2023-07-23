import $api from '../http/api';

export class MessageService {
    async sendMessage(message) {
        return await $api.post('/message', { message });
    }

    async getMessages() {
        return $api.get('/messages');
    }
}

const messageService = new MessageService();
export default messageService;