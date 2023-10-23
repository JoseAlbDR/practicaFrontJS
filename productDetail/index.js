import { confirmModalController } from '../confirmModal/confirmModalController.js';
import { menuController } from '../menu/menuController.js';
import { notificationController } from '../notifications/notificationsController.js';
import { spinnerController } from '../spinner/spinnerController.js';
import { productDetailController } from './productDetailController.js';
import { getProductId } from '../utils/getProductId.js';

document.addEventListener('DOMContentLoaded', () => {
  // Needed DOM nodes
  const modal = document.getElementById('modalSection');
  const notifications = document.getElementById('notifications');
  const productDetail = document.getElementById('productDetail');
  const spinner = document.getElementById('spinner');
  const menuContainer = document.getElementById('menu');

  // Modal
  const showModal = confirmModalController(modal);

  // Notifications
  const showNotification = notificationController(notifications);

  // Loader/Spinner
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  // Menu
  menuController(menuContainer, '');

  // Event Listeners
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

  // Controller with product id
  const id = getProductId();
  productDetailController(productDetail, id);
});
