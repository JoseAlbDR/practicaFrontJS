import { LOGIN_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

export const loginUser = async (userData) => {
  const accessToken = await customFetch.post(LOGIN_ENDPOINT, {
    body: userData,
  });
  return accessToken;
};
