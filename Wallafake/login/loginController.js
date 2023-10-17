import { loginUser } from './loginModel.js';
import { dispatchEvent } from '../utils/createCustomEvent.js';

export const loginController = async (form) => {
  const formData = new FormData(form);

  const user = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  try {
    const res = await loginUser(user);

    localStorage.setItem('accessToken', res.accessToken);

    dispatchEvent(
      'login',
      { type: 'success', message: 'User logged in successfully' },
      form
    );

    setTimeout(() => {
      window.location.href = 'create-product.html';
    }, 1000);
  } catch (error) {
    dispatchEvent(
      'login',
      {
        type: 'error',
        message: error.message || 'Error logging in, try again later',
      },
      form
    );
  }
};
