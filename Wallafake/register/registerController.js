import { registerUser } from './registerModel.js';
import {
  createCustomEvent,
  dispatchEvent,
} from '../utils/createCustomEvent.js';

export const registerController = async (form) => {
  const formData = new FormData(form);

  const user = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  try {
    await registerUser(user);
    dispatchEvent(
      'signup',
      { type: 'success', message: 'User successfully created' },
      form
    );
    window.location.href = 'login.html';
  } catch (error) {
    dispatchEvent('signup', { type: 'error', message: error.message }, form);
  }
};
