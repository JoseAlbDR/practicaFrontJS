import { loginUser } from './loginModel.js';
import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
} from '../utils/customEvent.js';

export const loginController = async (form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const user = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    try {
      dispatchCustomEvent('loginStart', null, form);
      const res = await loginUser(user);
      localStorage.setItem('accessToken', res.accessToken);
      successMessageEvent('login', 'User logged in', form);
      window.location.href = '/';
    } catch (error) {
      errorMessageEvent('login', error.message, form);
    } finally {
      dispatchCustomEvent('loginEnd', null, form);
    }
  });
};
