import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
} from '../utils/index.js';
import { decodeToken } from '../utils/decodeToken.js';
import { deleteProduct, getProduct } from './productDetailModel.js';
import { buildProduct } from './productDetailView.js';

export const productDetailController = async (productDetail, productId) => {
  const userData = decodeToken(localStorage.getItem('accessToken'));

  try {
    dispatchCustomEvent('loadingProductStart', null, productDetail);
    const product = await getProduct(productId);
    renderProduct(product, productDetail);
    if (userData.userId === product.user.id) {
      const deleteButton = addDeleteButton(productDetail);
      deleteButton.addEventListener('click', async () => {
        confirm('Are you sure you want to delete');
        handleDeleteProduct(productId, productDetail);
      });
    }
  } catch (error) {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
    errorMessageEvent('productLoaded', error.message, productDetail);
  } finally {
    dispatchCustomEvent('loadingProductEnd', null, productDetail);
  }
};

const renderProduct = (product, productDetail) => {
  const productContainer = document.createElement('div');
  productContainer.classList.add('product');
  productContainer.classList.add('product-detail');
  productContainer.innerHTML = buildProduct(product);
  productDetail.appendChild(productContainer);
};

export const addDeleteButton = (productDetail) => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Product';
  deleteButton.classList.add('btn');
  deleteButton.classList.add('danger-btn');
  const productContent = productDetail.querySelector('.product-content');
  productContent.appendChild(deleteButton);
  return deleteButton;
};

export const handleDeleteProduct = async (id, productDetail) => {
  try {
    await deleteProduct(id);
    successMessageEvent('productDeleted', 'Product deleted', productDetail);
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  } catch (error) {
    errorMessageEvent('productDeleted', error.message, productDetail);
  }
};
