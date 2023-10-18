import {
  buildProduct,
  emptyProducts,
} from '../product-list/productsListView.js';
import { getProduct } from './productDetailModel.js';

export const productDetailController = async (productDetail) => {
  const id = getProductId();
  try {
    const product = await getProduct(id);
    if (!product) {
      productDetail.innerHTML = emptyProducts();
      return;
    }
    renderProduct(product, productDetail);
  } catch (error) {
    window.location.href = '/';
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
