import * as CONSTANTS from './CONSTANTS';

export const setData = async (key, data) => {
    await localStorage.setItem(key, JSON.stringify(data));
}
export const getData = async (key) => {
    let data = await localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
}
export const setToken = (token) => {
    return localStorage.setItem(CONSTANTS.TOKEN, token);
}
export const getToken = () => {
    return localStorage.getItem(CONSTANTS.TOKEN);
}
export const clearKey = (key) => {
    return localStorage.removeItem(key);
}
export const clearAll = () => {
    return localStorage.clear();
}