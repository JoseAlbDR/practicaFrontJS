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
  selectDefaultOption,
} from '../utils/index.js';

/**
 * Create Product Controller Function
 *
 * This function serves as a controller for creating or updating a product.
 * It checks the user's authentication status, retrieves product data if updating,
 * and handles form submission.
 *
 * @param {HTMLFormElement} form - The HTML form element for creating/updating a product.
 * @param {string} productId - The identifier of the product (if updating, null for creating).
 */
export const createProductController = async (form, productId) => {
  // Check authentication
  const token = localStorage.getItem('accessToken');
  checkAuth(token, form);

  // If updating an existing product, fill form and addListener
  if (productId) {
    const product = await getProduct(productId);
    fillForm(product, form);
    formSubmitListener(form, token, 'update', productId);
  }

  // If creating a new product, addListener
  if (!productId) {
    formSubmitListener(form, token, 'create');
  }
};

/**
 * Form Submit Listener Function
 *
 * This function adds a submit event listener to the form to handle product creation/update.
 *
 * @param {HTMLFormElement} form - The HTML form element for creating/updating a product.
 * @param {string} token - The user's authentication token.
 * @param {string} type - The type of action ('create' or 'update').
 * @param {string} productId - The identifier of the product (only for updates).
 */
const formSubmitListener = (form, token, type, productId) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = getProductFormData(formData);

    try {
      // Start Event for spinner and disable form
      dispatchCustomEvent(`${type}ProductStart`, null, form);
      disableForm(form);

      // Perform the product creation/update action based on the type.
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
      // End Event for spinner and enable form
      enableForm(form);
      dispatchCustomEvent(`${type}ProductEnd`, null, form);
    }
  });
};

/**
 * Fill Form Function
 *
 * This function populates the form with product data for updating.
 *
 * @param {object} product - The product data to populate the form with.
 * @param {HTMLFormElement} form - The HTML form element.
 */
const fillForm = (product, form) => {
  for (const key of Object.keys(product)) {
    const selectElement = form.querySelector(`[name="${key}"]`);
    if (key === 'for') {
      // Handle special case for 'for' property by selecting the default option.
      selectDefaultOption(selectElement, product[key]);
    } else {
      // Set the value of the form field based on the product data.
      selectElement.value = product[key];
    }
  }
};

/**
 * Get Product Form Data Function
 *
 * This function extracts and structures the form data into a specific format.
 *
 * @param {FormData} formData - The FormData object containing form field data.
 *
 * @returns {Object} - An object with structured product data.
 */
const getProductFormData = (formData) => {
  return {
    image: formData.get('image'),
    name: formData.get('name').toLowerCase(),
    description: formData.get('description'),
    price: +formData.get('price'),
    for: formData.get('for'),
  };
};

/**
 * Check Authentication Function
 *
 * This function checks the user's authentication status and handles the form accordingly.
 *
 * @param {string} token - The user's authentication token.
 * @param {HTMLFormElement} form - The HTML form element for creating/updating a product.
 */
const checkAuth = (token, form) => {
  // If the user is not authenticated, display an error message and redirect to the homepage.
  if (!token) {
    form.classList.remove('form');
    form.innerHTML = '';
    errorMessageEvent('create-product', 'Please first login', form);
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }
};
