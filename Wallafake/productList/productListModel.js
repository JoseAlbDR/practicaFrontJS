import { LIMIT, LIMIT_PARAM, customFetch } from '../utils/index.js';

export const getProducts = async (params) => {
  const urlSearchParams = new URLSearchParams(params).toString();

  const endPoint = `/api/products?_expand=user&${LIMIT_PARAM}&${urlSearchParams}`;

  const products = await customFetch.get(endPoint);
  return products;
};
