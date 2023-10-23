import {
  LIMIT,
  dispatchCustomEvent,
  errorMessageEvent,
  getSearchParams,
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
  quantity,
  searchForm
) => {
  const params = getSearchParams();
  let products = [];

  // Delete no needed params
  if (params.name === 'Any' || params.name === '') delete params.name;
  if (params.for === 'all') delete params.for;

  // Set values for search form after each search
  const selectLimit = searchForm.querySelector('#limit');
  const inputName = searchForm.querySelector('#productName');
  const selectType = searchForm.querySelector('#search-type');

  inputName.value = params.name || 'Any';
  selectDefaultOption(selectLimit, params._limit || LIMIT);
  selectDefaultOption(selectType, params.for);

  params.name = params.name.toLowerCase();
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
