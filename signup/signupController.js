import { registerUser } from './signupModel.js';
import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
  disableForm,
  enableForm,
} from '../utils/index.js';

/**
 * Register Controller Function
 *
 * This function controls the registration form submission and user registration process.
 *
 * @param {HTMLElement} form - The registration form element.
 */
export const registerController = (form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = getSignupFormData(formData);

    try {
      // Check if the entered password and repeated password match.
      if (isValidPassword(data.password, data.repeatPassword)) {
        // Start Event for spinner and disable form
        dispatchCustomEvent('signUpStart', null, form);
        disableForm(form);

        await registerUser(data);

        successMessageEvent('signup', 'User created', form);
        window.location.href = 'login.html';
      } else {
        // If the passwords do not match, throw an error.
        throw new Error('Passwords do not match');
      }
    } catch (error) {
      errorMessageEvent('signup', error.message, form);
    } finally {
      // End Event for spinner and enable form
      dispatchCustomEvent('signUpEnd', null, form);
      enableForm(form);
    }
  });
};

/**
 * Check if the entered password matches the repeated password.
 *
 * @param {string} password - The password entered during registration.
 * @param {string} repeatPassword - The repeated password entered during registration.
 * @returns {boolean} - True if passwords match, false otherwise.
 */
const isValidPassword = (password, repeatPassword) => {
  return password === repeatPassword;
};

/**
 * Extract and return relevant registration data from a FormData object.
 *
 * @param {FormData} formData - The FormData object containing registration data.
 * @returns {Object} - An object with username, password, and repeatPassword properties.
 */
const getSignupFormData = (formData) => {
  return {
    username: formData.get('username'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  };
};
