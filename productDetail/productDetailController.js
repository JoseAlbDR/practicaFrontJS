import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
} from '../utils/index.js';
import { decodeToken } from '../utils/decodeToken.js';
import { deleteProduct, getProduct } from './productDetailModel.js';
import { buildProduct, errorMessage } from './productDetailView.js';

/**
 * Product Detail Controller Function
 *
 * This function serves as a controller for managing the product detail view. It retrieves
 * product data, renders the product, and provides actions like updating, deleting, and navigation.
 *
 * @param {HTMLElement} productDetail - The container for the product detail view.
 * @param {string} productId - The identifier of the product to display.
 */
export const productDetailController = async (productDetail, productId) => {
  // Decode the user data from the authentication token in local storage.
  const userData = decodeToken(localStorage.getItem('accessToken'));

  try {
    // Start Event for spinner
    dispatchCustomEvent('loadingProductStart', null, productDetail);

    const product = await getProduct(productId);
    renderProduct(product, productDetail);

    const { backButton, deleteButton, updateButton } = createMutationButtons(
      userData,
      product
    );

    // Add a click event to the back button to navigate back in the browser's history.
    backButton.addEventListener('click', () => {
      window.history.back();
    });

    // If the user is the owner of the product, set up delete and update actions.
    if (userData?.userId === product.user.id) {
      deleteButton.addEventListener('click', async () => {
        const handler = async () =>
          await handleDeleteProduct(productId, productDetail);
        dispatchCustomEvent('confirmDeleteProduct', { handler }, productDetail);
      });

      updateButton.addEventListener('click', () => {
        // Redirect to the update product page with the product ID.
        window.location.href = `/update-product.html?id=${productId}`;
      });
    }
  } catch (error) {
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
    errorMessageEvent('productLoaded', error.message, productDetail);
  } finally {
    // End Event for spinner
    dispatchCustomEvent('loadingProductEnd', null, productDetail);
  }
};

/**
 * Render Product Function
 *
 * This function creates a product container and renders the product data in it.
 *
 * @param {Object} product - The product data to render.
 * @param {HTMLElement} productDetail - The container for the product detail view.
 */
const renderProduct = (product, productDetail) => {
  const productContainer = document.createElement('div');
  productContainer.classList.add('product');
  productContainer.classList.add('product-detail');
  productContainer.innerHTML = buildProduct(product);
  productDetail.appendChild(productContainer);
};

/**
 * Add Button Function
 *
 * This function creates and adds a button element to a container.
 *
 * @param {HTMLElement} container - The container to which the button will be added.
 * @param {string} type - The type of the button (e.g., 'back', 'delete', 'update').
 *
 * @returns {HTMLButtonElement} - The created button element.
 */
const addButton = (container, type) => {
  const button = document.createElement('button');
  button.textContent = `${type !== 'back' ? type + 'Product' : type}`;
  button.classList.add('btn');
  button.classList.add(
    `${
      type === 'delete'
        ? 'danger-btn'
        : type === 'update'
        ? 'btn-block'
        : 'btn-hipster'
    }`
  );
  container.appendChild(button);
  return button;
};

/**
 * Handle Delete Product Function
 *
 * This function handles the deletion of a product and manages success and error messages.
 *
 * @param {string} id - The identifier of the product to be deleted.
 * @param {HTMLElement} productDetail - The container for the product detail view.
 */
const handleDeleteProduct = async (id, productDetail) => {
  try {
    await deleteProduct(id);

    successMessageEvent('productDeleted', 'Product deleted', productDetail);
    window.location.href = '/';
  } catch (error) {
    errorMessageEvent('productDeleted', error.message, productDetail);
    productDetail.innerHTML = '';
    productDetail.innerHTML = errorMessage(window.location.href);
  }
};

/**
 * Create Mutation Buttons Function
 *
 * This function creates and returns buttons for product mutation actions.
 *
 * @returns {Object} - An object containing created buttons for back, delete, and update actions.
 */
const createMutationButtons = (userData, product) => {
  // Buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');
  const productContent = productDetail.querySelector('.product-content');
  productContent.appendChild(buttonsContainer);
  let updateButton;
  let deleteButton;

  // Create buttons
  if (userData?.userId === product.user.id) {
    updateButton = addButton(buttonsContainer, 'update');
    deleteButton = addButton(buttonsContainer, 'delete');
  }
  const backButton = addButton(buttonsContainer, 'back');

  return { backButton, updateButton, deleteButton };
};
