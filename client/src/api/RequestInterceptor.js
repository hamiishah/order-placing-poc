import axios from 'axios';
import * as LOCAL_STORAGE from './localStorage.service';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const token = LOCAL_STORAGE.getToken();
    if (token) {
        config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
});

export default axios;
