import api from './index';

const loginApi = (email, password) => {
    return api.post('/auth/login', { email, password });
};

const registerApi = (account) => {
    return api.post('/auth/register', account);
};

export {
    loginApi,
    registerApi
}