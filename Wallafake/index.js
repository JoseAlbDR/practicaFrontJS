import { productListController } from './product-list/productListController.js';
import { notificationController } from './notifications/notificationsController.js';
import { menuController } from './menu/menuController.js';
import { spinnerController } from './spinner/spinnerController.js';

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('products');
  const notifications = document.getElementById('notifications');
  const spinner = document.getElementById('spinner');
  const showNotification = notificationController(notifications);
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  const menuContainer = document.getElementById('menu');
  menuController(menuContainer, 'home');

  productList.addEventListener('productsLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  productList.addEventListener('loadingProductsStart', () => {
    showSpinner();
  });

  productList.addEventListener('loadingProductsEnd', () => {
    hideSpinner();
  });

  productListController(productList);
});
