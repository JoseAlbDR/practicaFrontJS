import { productListController } from './product-list/productListController.js';
import { notificationController } from './notifications/notificationsController.js';
import { menuController } from './menu/menuController.js';

const notifications = document.getElementById('notifications');
const showNotification = notificationController(notifications);

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('products');
  productListController(productList);

  const menuContainer = document.getElementById('menu');
  menuController(menuContainer, 'home');

  productList.addEventListener('productsLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  menuContainer.addEventListener('click', (e) => {
    if (e.target.id !== 'logout') return;

    localStorage.removeItem('accessToken');

    showNotification('Logging out...', 'success');

    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  });
});
