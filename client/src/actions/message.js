import MessageService from '../services/message-service.js';

export const sendMessage = async (message) => {
    try {
        await MessageService.sendMessage(message);
        return true;
    }
    catch (e) { alert(JSON.stringify(e.response.data, null, 4)); return false; }
};

export const getMessages = async () => {
    try {
        const response = await MessageService.getMessages();
        return response.data;
    }
    catch (e) { alert(e.response.data.message); }
};