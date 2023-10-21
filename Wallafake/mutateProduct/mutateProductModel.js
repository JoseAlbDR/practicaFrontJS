import { customFetch } from '../utils/index.js';

export const createProduct = async (product, token) => {
  const url = '/api/products';

  await customFetch.post(url, { body: product, auth: `Bearer ${token}` });
};

export const getProduct = async (id) => {
  const url = `/api/products/${id}?_expand=user`;
  const data = await customFetch.get(url);
  const product = {
    name: data.name,
    image: data.image,
    description: data.description,
    price: data.price,
    for: data.for,
  };
  return product;
};

export const updateProduct = async (product, token, id) => {
  const url = `/api/products/${id}`;
  const response = await customFetch.patch(url, {
    body: product,
    auth: `Bearer ${token}`,
  });
  return response;
};
