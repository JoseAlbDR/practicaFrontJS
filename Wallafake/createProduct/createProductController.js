import { createProduct } from './createProductModel.js';

export const createProductController = async (form) => {
  const product = {
    image: form.elements['image'].value,
    name: form.elements['name'].value,
    description: form.elements['description'].value,
    price: +form.elements['price'].value,
    for: form.elements['type'].value,
  };

  const token = localStorage.getItem('accessToken');

  try {
    const response = await createProduct(product, token);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
