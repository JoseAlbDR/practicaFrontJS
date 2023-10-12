import { productListController } from './product-list/productListController.js';
import { notificationController } from './notifications/notificationsController.js';

const notifications = document.getElementById('notifications');
const showNotification = notificationController(notifications);

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('products');
  productListController(productList);

  productList.addEventListener('productsLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });
});
