import { LIMIT_PARAM, customFetch } from '../utils/index.js';

export const getProducts = async (params) => {
  const urlSearchParams = new URLSearchParams(params).toString();

  let searchParams = params?._limit
    ? urlSearchParams
    : `${LIMIT_PARAM}&${urlSearchParams}`;

  const url = '/api/products?_expand=user';

  const endPoint = `${url}&${searchParams}`;

  const products = await customFetch.get(endPoint);
  return products;
};
