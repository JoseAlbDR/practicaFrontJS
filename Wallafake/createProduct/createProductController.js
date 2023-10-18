import { createProduct } from './createProductModel.js';
import { dispatchEvent } from '../utils/createCustomEvent.js';
import {
  errorMessageEvent,
  successMessageEvent,
} from '../utils/customEvent.js';

export const createProductController = async (form) => {
  const formData = new FormData(form);

  const product = {
    image: formData.get('image'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: +formData.get('price'),
    for: formData.get('type'),
  };

  const token = localStorage.getItem('accessToken');

  try {
    await createProduct(product, token);
    successMessageEvent('create-product', 'Product created', form);
    form.reset();
  } catch (error) {
    errorMessageEvent('create-product', error.message, form);
  }
};
