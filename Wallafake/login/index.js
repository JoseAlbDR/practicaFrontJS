import { loginController } from './loginController.js';
import { notificationController } from '../notifications/notificationsController.js';

const loginForm = document.getElementById('login-form');
const notifications = document.getElementById('notifications');

const showNotification = notificationController(notifications);

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loginController(loginForm);
});

loginForm.addEventListener('login', (e) => {
  showNotification(e.detail.message, e.detail.type);
});
