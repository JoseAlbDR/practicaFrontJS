import { registerController } from './registerController.js';
import { notificationController } from '../notifications/notificationsController.js';

const registerForm = document.getElementById('register-form');
const notifications = document.getElementById('notifications');

const showNotification = notificationController(notifications);

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  registerController(registerForm);
});

registerForm.addEventListener('signup', (e) => {
  showNotification(e.detail.message, e.detail.type);
});
