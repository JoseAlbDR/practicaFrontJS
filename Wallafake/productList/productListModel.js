import { customFetch } from '../utils/index.js';

export const getProducts = async (params) => {
  const urlSearchParams = new URLSearchParams(params).toString();

  const endPoint = `/api/products?_expand=user&${urlSearchParams}`;

  const products = await customFetch.get(endPoint);
  return products;
};
