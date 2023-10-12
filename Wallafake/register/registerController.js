import { registerUser } from './registerModel.js';
import { createCustomEvent } from '../utils/createCustomEvent.js';

export const registerController = async (form) => {
  const username = form.elements['username'].value;
  const password = form.elements['password'].value;
  const user = {
    username,
    password,
  };

  try {
    const res = await registerUser(user);
  } catch (error) {
    const event = createCustomEvent('register', 'error', error.message);
    form.dispatchEvent(event);
  }
};
