import { LOGIN_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

/**
 * Login User Function
 *
 * This function sends a login request to the server using the provided user data.
 *
 * @param {Object} userData - An object containing user data, including username and password.
 *
 * @returns {Promise<Object>} - A Promise that resolves to an object containing an access token.
 */
export const loginUser = async (userData) => {
  const accessToken = await customFetch.post(LOGIN_ENDPOINT, {
    body: userData,
  });

  return accessToken;
};
