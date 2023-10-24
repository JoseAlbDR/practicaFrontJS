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
  const paginationUp = document.getElementById('pagination-up');
  const paginationDown = document.getElementById('pagination-down');
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

  paginationUp.addEventListener('paginationLoaded', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  productList.addEventListener('loadingProductsStart', () => {
    productList.innerHTML = '';
    showSpinner();
  });

  productList.addEventListener('loadingProductsEnd', () => {
    hideSpinner();
  });

  paginationUp.addEventListener('pageChanged', () => {
    paginationController(paginationDown);
    productListController(productList, quantity, searchForm);
  });

  paginationDown.addEventListener('pageChanged', () => {
    paginationController(paginationUp);
    productListController(productList, quantity, searchForm);
  });

  // Controllers
  paginationController(paginationUp);
  paginationController(paginationDown);
  productListController(productList, quantity, searchForm);
});
