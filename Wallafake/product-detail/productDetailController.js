import { buildProduct } from '../product-list/productsListView.js';
import { dispatchCustomEvent, errorMessageEvent } from '../utils/index.js';
// import { decodeToken } from '../utils/decodeToken.js';
import { getProduct } from './productDetailModel.js';

export const productDetailController = async (productDetail, id) => {
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

const renderProduct = (product, productDetail) => {
  const productContainer = document.createElement('div');
  productContainer.classList.add('product');
  productContainer.classList.add('product-detail');
  productContainer.innerHTML = buildProduct(product);
  productDetail.appendChild(productContainer);
};

// const handleDeleteTweet = (createdBy) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     const { userId } = decodeToken(token);

//     if (userId === createdBy) {
//     }
//   }
// };

// const addDeleteButton = (productDetail) => {
//   const deleteButton = document.createElement('button');
//   deleteButton.textContent = 'Delete Product';

//   productDetail.insertAdjacentHTML('beforeend', deleteButton);

//   deleteButton.addEventListener('click', () => {});
// };
