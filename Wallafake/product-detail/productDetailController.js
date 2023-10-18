import { buildProduct } from '../product-list/productsListView.js';
import {
  dispatchCustomEvent,
  errorMessageEvent,
} from '../utils/customEvent.js';
import { getProduct } from './productDetailModel.js';

export const productDetailController = async (productDetail) => {
  const id = getProductId();
  try {
    dispatchCustomEvent('loadingProductStart', null, productDetail);
    const product = await getProduct(id);
    renderProduct(product, productDetail);
  } catch (error) {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
    errorMessageEvent('productLoaded', error.message, productDetail);
  } finally {
    dispatchCustomEvent('loadingProductEnd', null, productDetail);
  }
};

const getProductId = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get('id');
  return id;
};

const renderProduct = (product, productDetail) => {
  const productContainer = document.createElement('div');
  productContainer.classList.add('product');
  productContainer.classList.add('product-detail');
  productContainer.innerHTML = buildProduct(product);
  productDetail.appendChild(productContainer);
};
