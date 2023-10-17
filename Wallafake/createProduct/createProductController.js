import { createProduct } from './createProductModel.js';
import { dispatchEvent } from '../utils/createCustomEvent.js';

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
    dispatchEvent(
      'create-product',
      { type: 'success', message: 'Product created successfully' },
      form
    );
    form.reset();
  } catch (error) {
    dispatchEvent(
      'create-product',
      {
        type: 'error',
        message: error.message || 'Error creating product, try again later',
      },
      form
    );
  }
};
