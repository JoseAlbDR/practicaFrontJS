import { registerUser } from './signupModel.js';
import { dispatchEvent } from '../utils/createCustomEvent.js';

export const registerController = async (form) => {
  const formData = new FormData(form);

  const user = {
    username: formData.get('username'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  };

  try {
    if (isValidPassword(password, repeatPassword)) {
      await registerUser(user);
      dispatchEvent(
        'signup',
        { type: 'success', message: 'User successfully created' },
        form
      );
      window.location.href = 'login.html';
    } else {
      throw new Error('Passwords do not match');
    }
  } catch (error) {
    dispatchEvent('signup', { type: 'error', message: error.message }, form);
  }
};

const isValidPassword = (password, repeatPassword) => {
  return password === repeatPassword;
};
