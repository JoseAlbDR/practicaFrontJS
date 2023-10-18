import { registerUser } from './signupModel.js';
import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
} from '../utils/customEvent.js';

export const registerController = (form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = getFormData(formData);

    try {
      if (isValidPassword(data.password, data.repeatPassword)) {
        dispatchCustomEvent('signUpStart', null, form);
        await registerUser(data);
        successMessageEvent('signup', 'User created', form);
        window.location.href = 'login.html';
      } else {
        throw new Error('Passwords do not match');
      }
    } catch (error) {
      errorMessageEvent('signup', error.message, form);
    } finally {
      dispatchCustomEvent('signUpEnd', null, form);
    }
  });
};

const isValidPassword = (password, repeatPassword) => {
  return password === repeatPassword;
};

const getFormData = (formData) => {
  return {
    username: formData.get('username'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  };
};
