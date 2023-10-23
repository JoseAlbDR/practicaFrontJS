import { productListController } from './productList/productListController.js';
import { notificationController } from './notifications/notificationsController.js';
import { menuController } from './menu/menuController.js';
import { spinnerController } from './spinner/spinnerController.js';
import { paginationController } from './pagination/paginationController.js';
import { searchController } from './search/searchController.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Needed DOM nodes
  const productList = document.getElementById('products');
  const notifications = document.getElementById('notifications');
  const spinner = document.getElementById('spinner');
  const quantity = document.getElementById('products-quantity');
  const pagination = document.getElementById('pagination');
  const menuContainer = document.getElementById('menu');
  const searchForm = document.getElementById('search-form');

  // Notifications
  const showNotification = notificationController(notifications);

  // Loader/Spinner
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  // Menu
  menuController(menuContainer, 'home');

  // Search Form
  searchController(searchForm);

  // Event listeners
  productList.addEventListener('productsLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  pagination.addEventListener('paginationLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  productList.addEventListener('loadingProductsStart', () => {
    productList.innerHTML = '';
    showSpinner();
  });

  productList.addEventListener('loadingProductsEnd', () => {
    hideSpinner();
  });

  pagination.addEventListener('pageChanged', () => {
    productListController(productList, quantity, searchForm);
  });

  // Controllers
  paginationController(pagination);
  productListController(productList, quantity, searchForm);
});
