import axios from './RequestInterceptor';
import API_URLS from './apiUrl';
import * as LOCAL_STORAGE from './localStorage.service';

export const post = async (path, data) => {
    try {
        let res = await axios.post(path, data);
        return res;
    } catch (ex) {
        throw ex;
    }
}
export const get = async (path) => {
    try {
        let res = await axios.get(path);
        return res;
    } catch (ex) {
        throw ex;
    }
}
export const login = async (data) => {

    try {
        let res = await axios.post(API_URLS.login, data);
        if (res.data && res.status === 200) {
            LOCAL_STORAGE.setToken(res.data.token);
            localStorage.setItem('id', res.data.id);
            localStorage.setItem('role', res.data.role);
        }
        return res;
    } catch (ex) {
        return ex;
    }
}
export const logout = async () => {
    try {
        await LOCAL_STORAGE.clearAll();
    } catch (ex) {
        throw ex;
    }
}
