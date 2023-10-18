import { menuController } from '../menu/menuController.js';
import { notificationController } from '../notifications/notificationsController.js';
import { spinnerController } from '../spinner/spinnerController.js';
import { productDetailController } from './productDetailController.js';

document.addEventListener('DOMContentLoaded', () => {
  const notifications = document.getElementById('notifications');
  const productDetail = document.getElementById('productDetail');
  const spinner = document.getElementById('spinner');
  const showNotification = notificationController(notifications);
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  const menuContainer = document.getElementById('menu');
  menuController(menuContainer, '');

  productDetail.addEventListener('productLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  productDetail.addEventListener('loadingProductStart', () => {
    showSpinner();
  });

  productDetail.addEventListener('loadingProductEnd', () => {
    hideSpinner();
  });

  productDetailController(productDetail);
});
