import {
  createProduct,
  getProduct,
  updateProduct,
} from './mutateProductModel.js';

import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
  disableForm,
  enableForm,
} from '../utils/index.js';

export const createProductController = async (form, productId) => {
  const token = localStorage.getItem('accessToken');
  checkAuth(token, form);

  if (productId) {
    const product = await getProduct(productId);
    fillForm(product, form);
    formSubmitListener(form, token, 'update', productId);
  }

  if (!productId) {
    formSubmitListener(form, token, 'create');
  }
};

const formSubmitListener = (form, token, type, productId) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = getProductFormData(formData);
    try {
      dispatchCustomEvent(`${type}ProductStart`, null, form);
      disableForm(form);
      type === 'create'
        ? await createProduct(data, token)
        : await updateProduct(data, token, productId);
      successMessageEvent(`${type}-product`, `Product ${type}d`, form);
      form.reset();
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      errorMessageEvent(`${type}-product`, error.message, form);
    } finally {
      enableForm(form);
      dispatchCustomEvent(`${type}ProductEnd`, null, form);
    }
  });
};

const fillForm = (product, form) => {
  for (const key of Object.keys(product)) {
    const selectElement = form.querySelector(`[name="${key}"]`);
    if (key === 'for') {
      selectOption(selectElement, product, key);
    } else {
      selectElement.value = product[key];
    }
  }
};

const selectOption = (selectElement, product, key) => {
  const options = selectElement.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === product[key]) {
      selectElement.selectedIndex = i;
      return;
    }
  }
};

const getProductFormData = (formData) => {
  return {
    image: formData.get('image'),
    name: formData.get('name').toLowerCase(),
    description: formData.get('description'),
    price: +formData.get('price'),
    for: formData.get('for'),
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
