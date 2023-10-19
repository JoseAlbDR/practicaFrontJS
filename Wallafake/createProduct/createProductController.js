import { createProduct } from './createProductModel.js';
import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
  disableForm,
  enableForm,
} from '../utils/index.js';

export const createProductController = (form) => {
  const token = localStorage.getItem('accessToken');

  checkAuth(token, form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = getCreateProductFormData(formData);

    try {
      dispatchCustomEvent('createProductStart', null, form);
      disableForm(form);
      await createProduct(data, token);
      successMessageEvent('create-product', 'Product created', form);
      form.reset();
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      errorMessageEvent('create-product', error.message, form);
    } finally {
      enableForm(form);
      dispatchCustomEvent('createProductEnd', null, form);
    }
  });
};

const getCreateProductFormData = (formData) => {
  return {
    image: formData.get('image'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: +formData.get('price'),
    for: formData.get('type'),
  };
};

const checkAuth = (token, form) => {
  if (!token) {
    form.classList.remove('form');
    form.innerHTML = '';
    errorMessageEvent('create-product', 'Please first login', form);
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }
};
