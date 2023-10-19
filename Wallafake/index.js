import { productListController } from './productList/productListController.js';
import { notificationController } from './notifications/notificationsController.js';
import { menuController } from './menu/menuController.js';
import { spinnerController } from './spinner/spinnerController.js';

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('products');
  const notifications = document.getElementById('notifications');
  const spinner = document.getElementById('spinner');
  const resetBtn = document.getElementById('reset-btn');
  const searchForm = document.getElementById('search-form');
  const showNotification = notificationController(notifications);
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  const searchParams = getSearchParams();

  resetBtn.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.location.href = url.toString();
  });

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

  productListController(productList, searchParams);
});

const getSearchParams = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};
