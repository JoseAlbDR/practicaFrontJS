import { dispatchEvent } from '../utils/createCustomEvent.js';
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
    dispatchEvent(
      'productsLoaded',
      { type: 'success', message: 'Products loaded successfully' },
      productList
    );
  } catch (error) {
    dispatchEvent(
      'productsLoaded',
      { type: 'error', message: error.message || 'Error loading products' },
      productList
    );
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
