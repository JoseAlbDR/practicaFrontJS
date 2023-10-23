import { productListController } from './productList/productListController.js';
import { notificationController } from './notifications/notificationsController.js';
import { menuController } from './menu/menuController.js';
import { spinnerController } from './spinner/spinnerController.js';
import { paginationController } from './pagination/paginationController.js';
import { searchController } from './search/searchController.js';

document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('products');
  const notifications = document.getElementById('notifications');
  const spinner = document.getElementById('spinner');
  const quantity = document.getElementById('products-quantity');
  const pagination = document.getElementById('pagination');

  const showNotification = notificationController(notifications);
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  // MENU
  const menuContainer = document.getElementById('menu');
  menuController(menuContainer, 'home');

  // SEARCH FORM
  const searchForm = document.getElementById('search-form');
  searchController(searchForm);

  // LISTENERS
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

  // CONTROLLERS
  await paginationController(pagination);
  await productListController(productList, quantity, searchForm);
});
