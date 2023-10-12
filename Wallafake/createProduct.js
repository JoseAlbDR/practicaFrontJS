import { createProductController } from './createProduct/createProductController.js';
import { notificationController } from './notifications/notificationsController.js';

const createForm = document.getElementById('create-form');
const notifications = document.getElementById('notifications');

const showNotification = notificationController(notifications);

createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createProductController(createForm);
});

createForm.addEventListener('create-product', (e) => {
  showNotification(e.detail.message, e.detail.type);
});
