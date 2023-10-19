import { customFetch } from '../utils/index.js';

export const registerUser = async (userData) => {
  const user = { username: userData.username, password: userData.password };
  const endPoint = '/auth/register';

  customFetch.post(endPoint, { body: user });
};
