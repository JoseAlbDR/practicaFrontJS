import { SIGNUP_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

export const registerUser = async (userData) => {
  const user = { username: userData.username, password: userData.password };

  customFetch.post(SIGNUP_ENDPOINT, { body: user });
};
