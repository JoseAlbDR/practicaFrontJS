import {
  dispatchCustomEvent,
  errorMessageEvent,
  successMessageEvent,
} from '../utils/index.js';
import { decodeToken } from '../utils/decodeToken.js';
import { deleteProduct, getProduct } from './productDetailModel.js';
import { buildProduct, errorMessage } from './productDetailView.js';

export const productDetailController = async (productDetail, productId) => {
  const userData = decodeToken(localStorage.getItem('accessToken'));

  try {
    dispatchCustomEvent('loadingProductStart', null, productDetail);
    const product = await getProduct(productId);
    renderProduct(product, productDetail);
    if (userData?.userId === product.user.id) {
      const { deleteButton, updateButton } = createMutationButtons();

      deleteButton.addEventListener('click', async () => {
        const handler = async () =>
          await handleDeleteProduct(productId, productDetail);
        dispatchCustomEvent('confirmDeleteProduct', { handler }, productDetail);
      });

      updateButton.addEventListener('click', () => {
        window.location.href = `/update-product.html?id=${productId}`;
      });
    }
  } catch (error) {
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
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

const addButton = (container, type) => {
  const button = document.createElement('button');
  button.textContent = `${type} Product`;
  button.id = `${type}-product-btn`;
  button.classList.add('btn');
  button.classList.add(`${type === 'delete' ? 'danger-btn' : 'btn-hipster'}`);
  container.appendChild(button);
  return button;
};

const handleDeleteProduct = async (id, productDetail) => {
  try {
    await deleteProduct(id);
    successMessageEvent('productDeleted', 'Product deleted', productDetail);
    window.location.href = '/';
  } catch (error) {
    errorMessageEvent('productDeleted', error.message, productDetail);
    productDetail.innerHTML = '';
    productDetail.innerHTML = errorMessage(window.location.href);
  }
};

const createMutationButtons = () => {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');
  const productContent = productDetail.querySelector('.product-content');
  productContent.appendChild(buttonsContainer);
  const updateButton = addButton(buttonsContainer, 'update');
  const deleteButton = addButton(buttonsContainer, 'delete');

  return { updateButton, deleteButton };
};
