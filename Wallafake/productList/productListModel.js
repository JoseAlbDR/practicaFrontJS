import { RESOURCE_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

export const getProducts = async (params) => {
  const searchParams = new URLSearchParams(params);

  const endPoint = `${RESOURCE_ENDPOINT}?${searchParams.toString()}`;

  const products = await customFetch.get(endPoint);
  return products;
};
