import { loginUser } from './loginModel.js';
import { createCustomEvent } from '../utils/createCustomEvent.js';

export const loginController = async (form) => {
  const formData = new FormData(form);

  const user = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  try {
    const res = await loginUser(user);
    localStorage.setItem('accessToken', res.accessToken);
    const event = createCustomEvent(
      'login',
      'success',
      'User logged in successfully'
    );
    form.dispatchEvent(event);

    setTimeout(() => {
      window.location.href = 'create-product.html';
    }, 1000);
  } catch (error) {
    const event = createCustomEvent('login', 'error', error.message);
    form.dispatchEvent(event);
  }
};
