import { createProductController } from './createProductController.js';
import { notificationController } from '../notifications/notificationsController.js';
import { menuController } from '../menu/menuController.js';
import { spinnerController } from '../spinner/spinnerController.js';

document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('create-form');
  const notifications = document.getElementById('notifications');
  const showNotification = notificationController(notifications);
  const menuContainer = document.getElementById('menu');
  const spinner = document.getElementById('spinner');
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  menuController(menuContainer, 'createProduct');

  createForm.addEventListener('create-product', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  createForm.addEventListener('createProductStart', () => {
    showSpinner();
  });

  createForm.addEventListener('createProductEnd', () => {
    hideSpinner();
  });

  createProductController(createForm);
});
