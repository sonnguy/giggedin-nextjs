import api from './index';
import { authHeader } from '../services/apiService';

const loginApi = (email, password) => {
  return api.post('/auth/login', { email, password });
};
const loginFacebook = (access_token) => {
  return api.post('/facebook/login', { code: access_token });
};

const registerApi = (account) => {
  return api.post('/auth/register', account);
};
const userCheck = (email) => {
  return api.post('/user/check', { email });
};

const updateUserEmailApi = (email) => {
  const requestOptions = {
    headers: authHeader(),
  };
  return api.post('/user/update ', { email }, requestOptions);
};

const forgotPasswordApi = (email) => {
  return api.post('/user/forgotPassword', { email });
};

const resetPasswordApi = (token, password) => {
  return api.post('/user/updatePassword', { token, password });
};

export { loginApi, registerApi, userCheck, loginFacebook, forgotPasswordApi, resetPasswordApi, updateUserEmailApi };
