import { loginUser } from './loginModel.js';
import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
  disableForm,
  enableForm,
} from '../utils/index.js';

/**
 * Login Controller Function
 *
 * This function serves as a controller for handling user login interactions.
 * It intercepts the form submission, sends a login request to the server,
 * and manages success and error messages, form disabling/enabling, and events.
 *
 * @param {HTMLFormElement} form - The HTML form element for user login.
 */
export const loginController = async (form) => {
  // Add an event listener to the form to intercept its submission.
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the form data
    const formData = new FormData(form);
    const user = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    try {
      // Start Event for spinner and disable form
      dispatchCustomEvent('loginStart', null, form);
      disableForm(form);

      const res = await loginUser(user);

      localStorage.setItem('accessToken', res.accessToken);

      successMessageEvent('login', 'User logged in', form);
      window.location.href = '/';
    } catch (error) {
      errorMessageEvent('login', error.message, form);
    } finally {
      // End Event for spinner and enable form
      dispatchCustomEvent('loginEnd', null, form);
      enableForm(form);
    }
  });
};
