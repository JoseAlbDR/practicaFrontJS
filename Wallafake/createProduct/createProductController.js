import { createProduct } from './createProductModel.js';
import { createCustomEvent } from '../utils/createCustomEvent.js';

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
    const event = createCustomEvent(
      'create-product',
      'success',
      'Product created successfully'
    );
    form.dispatchEvent(event);
    form.reset();
  } catch (error) {
    const event = createCustomEvent('create-product', 'error', error.message);
    form.dispatchEvent(event);
  }
};
