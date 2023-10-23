import { createProductController } from './mutateProductController.js';
import { notificationController } from '../notifications/notificationsController.js';
import { menuController } from '../menu/menuController.js';
import { spinnerController } from '../spinner/spinnerController.js';
import { getProductId } from '../utils/getProductId.js';

document.addEventListener('DOMContentLoaded', () => {
  // Needed DOM nodes
  const notifications = document.getElementById('notifications');
  const menuContainer = document.getElementById('menu');
  const spinner = document.getElementById('spinner');
  const backBtn = document.getElementById('back-btn');

  // Notifications
  const showNotification = notificationController(notifications);
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  // Get needed form based on if the productId exist in the url
  const productId = getProductId();

  let currentProductForm;
  let mutationType;

  if (productId) {
    currentProductForm = document.getElementById('update-form');
    mutationType = 'update';
  } else {
    currentProductForm = document.getElementById('create-form');
    mutationType = 'create';
  }

  // Menu
  menuController(menuContainer, `${mutationType}Product`);

  // Event Listeners
  currentProductForm.addEventListener(`${mutationType}-product`, (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  currentProductForm.addEventListener(`${mutationType}ProductStart`, () => {
    showSpinner();
  });

  currentProductForm.addEventListener(`${mutationType}ProductEnd`, () => {
    hideSpinner();
  });

  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  // Controller
  createProductController(currentProductForm, productId);
});
