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
  const paginationTop = document.getElementById('pagination-top');
  const paginationBottom = document.getElementById('pagination-bottom');
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

  paginationTop.addEventListener('paginationLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  paginationBottom.addEventListener('paginationLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  productList.addEventListener('loadingProductsStart', () => {
    productList.innerHTML = '';
    showSpinner();
  });

  productList.addEventListener('loadingProductsEnd', () => {
    hideSpinner();
  });

  paginationTop.addEventListener('pageChanged', () => {
    paginationController(paginationBottom);
    productListController(productList, quantity, searchForm);
  });

  paginationBottom.addEventListener('pageChanged', () => {
    paginationController(paginationTop);
    productListController(productList, quantity, searchForm);
  });

  // Controllers
  paginationController(paginationTop);
  paginationController(paginationBottom);
  productListController(productList, quantity, searchForm);
});
