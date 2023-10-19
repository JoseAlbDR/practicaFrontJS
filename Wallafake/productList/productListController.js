import { dispatchCustomEvent, errorMessageEvent } from '../utils/index.js';
import { getProducts } from './productListModel.js';
import { buildProduct, emptyProducts } from './productsListView.js';

export const productListController = async (productList, params, quantity) => {
  let products = [];
  try {
    dispatchCustomEvent('loadingProductsStart', null, productList);
    products = await getProducts(params);
    quantity.innerText = products.length;
    if (products.length === 0) {
      productList.innerHTML = emptyProducts();
      return;
    }
    renderProducts(products, productList);
  } catch (error) {
    errorMessageEvent('productsLoaded', error.message, productList);
  } finally {
    dispatchCustomEvent('loadingProductsEnd', null, productList);
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