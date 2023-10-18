import { createProduct } from './createProductModel.js';
import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
} from '../utils/customEvent.js';
import { disableForm } from '../utils/disableForm.js';
import { enableForm } from '../utils/enableForm.js';

export const createProductController = (form) => {
  const token = localStorage.getItem('accessToken');
  console.log(token);
  if (!token) {
    form.classList.remove('form');
    form.innerHTML = '';
    errorMessageEvent('create-product', 'Please first login', form);
    setTimeout(() => {
      window.location.href = '/';
    }, 10000);
  }

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
