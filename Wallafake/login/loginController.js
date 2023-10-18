import { loginUser } from './loginModel.js';
import { dispatchCustomEvent } from '../utils/customEvent.js';

export const loginController = async (form) => {
  const formData = new FormData(form);

  const user = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  try {
    const res = await loginUser(user);

    localStorage.setItem('accessToken', res.accessToken);

    dispatchCustomEvent(
      'login',
      { type: 'success', message: 'User logged in successfully' },
      form
    );

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    dispatchCustomEvent(
      'login',
      {
        type: 'error',
        message: error.message || 'Error logging in, try again later',
      },
      form
    );
  }
};
