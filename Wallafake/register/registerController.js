import { registerUser } from './registerModel.js';
import { createCustomEvent } from '../utils/createCustomEvent.js';

export const registerController = async (form) => {
  const formData = new FormData(form);

  const user = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  try {
    await registerUser(user);
    const event = createCustomEvent(
      'register',
      'success',
      'User successfully created'
    );
    form.dispatchEvent(event);
    window.location.href = 'login.html';
  } catch (error) {
    const event = createCustomEvent('register', 'error', error.message);
    form.dispatchEvent(event);
  }
};
