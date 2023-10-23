import { SIGNUP_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

/**
 * Register User Function
 *
 * This function sends a registration request to the server, creating a new user account.
 *
 * @param {Object} userData - An object containing user registration data, including username and password.
 */
export const registerUser = async (userData) => {
  const user = { username: userData.username, password: userData.password };

  customFetch.post(SIGNUP_ENDPOINT, { body: user });
};
