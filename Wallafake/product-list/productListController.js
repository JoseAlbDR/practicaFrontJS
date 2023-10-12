import { createCustomEvent } from '../utils/createCustomEvent.js';
import { getProducts } from './productListModel.js';
import { buildProduct, emptyProducts } from './productsListView.js';

export const productListController = async (productList) => {
  let products = [];
  try {
    products = await getProducts();
    if (products.length === 0) {
      productList.innerHTML = emptyProducts();
      return;
    }
    renderProducts(products, productList);
    const event = createCustomEvent(
      'productsLoaded',
      'success',
      'Products loaded successfully'
    );
    productList.dispatchEvent(event);
  } catch (error) {
    const event = createCustomEvent(
      'productsLoaded',
      'error',
      error.message || 'Error loading products'
    );
    productList.dispatchEvent(event);
  }
};

const renderProducts = (products, productList) => {
  products.forEach((product) => {
    const productContainer = document.createElement('div');
    productContainer.classList.add('product');
    productContainer.innerHTML = buildProduct(product);
    productList.appendChild(productContainer);
  });
};
