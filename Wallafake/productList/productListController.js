import {
  LIMIT,
  dispatchCustomEvent,
  errorMessageEvent,
  selectDefaultOption,
} from '../utils/index.js';
import { getProducts } from './productListModel.js';
import {
  buildProduct,
  emptyProducts,
  errorMessage,
} from './productsListView.js';

export const productListController = async (
  productList,
  params,
  quantity,
  searchForm
) => {
  let products = [];

  // If name input is empty do not query it
  if (params.name === '') delete params.name;

  // Set values for search form
  const selectLimit = searchForm.querySelector('#limit');
  const inputName = searchForm.querySelector('#productName');

  inputName.value = params.name || '';
  selectDefaultOption(selectLimit, params._limit || LIMIT);

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
