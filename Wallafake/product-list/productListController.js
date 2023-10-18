import { errorMessageEvent } from '../utils/customEvent.js';
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
  } catch (error) {
    errorMessageEvent('productsLoaded', error.message, form);
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
