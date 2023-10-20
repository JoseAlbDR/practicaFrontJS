import { confirmModalController } from '../confirmModal/confirmModalController.js';
import { menuController } from '../menu/menuController.js';
import { notificationController } from '../notifications/notificationsController.js';
import { spinnerController } from '../spinner/spinnerController.js';
import { productDetailController } from './productDetailController.js';
import { getProductId } from '../utils/getProductId.js';

document.addEventListener('DOMContentLoaded', () => {
  const notifications = document.getElementById('notifications');
  const productDetail = document.getElementById('productDetail');
  const spinner = document.getElementById('spinner');
  const modal = document.getElementById('modal');
  const showModal = confirmModalController(modal);
  const showNotification = notificationController(notifications);
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  const id = getProductId();

  const menuContainer = document.getElementById('menu');
  menuController(menuContainer, '');

  productDetail.addEventListener('productLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  productDetail.addEventListener('productDeleted', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  productDetail.addEventListener('confirmDeleteProduct', (e) => {
    showModal('Are you sure you want to delete the product?', e.detail.handler);
  });

  productDetail.addEventListener('loadingProductStart', () => {
    showSpinner();
  });

  productDetail.addEventListener('loadingProductEnd', () => {
    hideSpinner();
  });

  productDetailController(productDetail, id);
});
