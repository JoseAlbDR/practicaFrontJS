import {
  LIMIT,
  dispatchCustomEvent,
  errorMessageEvent,
  filterParams,
  getSearchParams,
  selectDefaultOption,
} from '../utils/index.js';
import { getProducts } from './productListModel.js';
import {
  buildProduct,
  emptyProducts,
  errorMessage,
} from './productsListView.js';

export const productListController = async (productList, quantity) => {
  let products = [];
  const params = getSearchParams();

  // Delete default params (name=any, for=all) set default limit
  filterParams(params);

  try {
    dispatchCustomEvent('loadingProductsStart', null, productList);

    products = await getProducts(params);
    quantity.innerText = products.length;
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
