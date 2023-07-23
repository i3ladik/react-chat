import $api from '../http/api';

export class AuthService {
    async registration(email, password, nickname) {
        return await $api.post('/auth/registration', { email, password, nickname });
    }

    async login(email, password) {
        return $api.post('/auth/login', { email, password });
    }

    async logout() {
        return $api.post('/auth/logout');
    }

    async refresh() {
        return $api.get('/auth/refresh');
    }

    async test() {
        return $api.get('/auth/test');
    }
}

const authService = new AuthService();
export default authService;