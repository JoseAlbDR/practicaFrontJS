import { createProductController } from './createProduct/createProductController.js';
import { notificationController } from './notifications/notificationsController.js';
import { menuController } from './menu/menuController.js';

const createForm = document.getElementById('create-form');
const notifications = document.getElementById('notifications');

const showNotification = notificationController(notifications);

const menuContainer = document.getElementById('menu');
menuController(menuContainer, 'createProduct');

createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createProductController(createForm);
});

createForm.addEventListener('create-product', (e) => {
  showNotification(e.detail.message, e.detail.type);
});
