import { customFetch } from '../utils/index.js';

export const loginUser = async (userData) => {
  const endPoint = '/auth/login';
  const accessToken = await customFetch.post(endPoint, { body: userData });
  return accessToken;
};
