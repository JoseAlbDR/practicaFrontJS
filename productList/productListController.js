// Import necessary utilities and functions.
import {
  dispatchCustomEvent,
  errorMessageEvent,
  filterParams,
  getSearchParams,
} from '../utils/index.js';
import { getProducts } from './productListModel.js';
import {
  buildProduct,
  emptyProducts,
  errorMessage,
} from './productsListView.js';

/**
 * Product List Controller Function
 *
 * This function controls the display of a list of products based on search parameters.
 *
 * @param {HTMLElement} productList - The container for displaying the list of products.
 * @param {HTMLElement} quantity - The element to display the quantity of products.
 */
export const productListController = async (productList, quantity) => {
  let products = [];

  const params = getSearchParams();

  // Delete default params (name=any, for=all) and set default limit.
  filterParams(params);

  try {
    // Start event for spinner
    dispatchCustomEvent('loadingProductsStart', null, productList);

    products = await getProducts(params);
    quantity.innerText = products.length;

    // Empty products message
    if (products.length === 0) {
      productList.innerHTML = emptyProducts();
      return;
    }

    productList.innerHTML = '';
    renderProducts(products, productList);
  } catch (error) {
    errorMessageEvent('productsLoaded', error.message, productList);
    productList.innerHTML = errorMessage();
  } finally {
    // End event for spinner
    dispatchCustomEvent('loadingProductsEnd', null, productList);
  }
};

/**
 * Render Products Function
 *
 * This function renders a list of products in the specified product list container.
 *
 * @param {Object[]} products - An array of product objects to be displayed.
 * @param {HTMLElement} productList - The container for displaying the products.
 */
const renderProducts = (products, productList) => {
  products.forEach((product) => {
    // Create a container for each product and populate it with product details.
    const productContainer = document.createElement('div');
    productContainer.classList.add('product');
    productContainer.innerHTML = buildProduct(product);
    productList.appendChild(productContainer);
  });
};
