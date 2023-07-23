import AuthService from '../services/auth-service.js';
import { setUser, setLogout } from '../reducers/user-reducer.js';

export const auth = () => {
    return async dispatch => {
        try {
            const response = await AuthService.refresh();
            if(!response.data.user.isVerif) return;
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.accessToken);
        }
        catch (e) { return; }
    }
};

export const registration = async (email, password, nickname) => {
    try {
        const response = await AuthService.registration(email, password, nickname);
        alert(response.data.message);
        return true;
    }
    catch (e) { alert(e.response.data.message); return false; }
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await AuthService.login(email, password);
            if(!response.data.user.isVerif) return alert('Confirm your email!');
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.accessToken);
            return true;
        } catch (e) { alert(e.response.data.message); }
    }
};

export const logout = () => {
    return async dispatch => {
        try {
            await AuthService.logout();
            dispatch(setLogout());
            localStorage.removeItem('token');
        } catch (e) { alert(e.response.data.message); }
    }
};