import { loginController } from './login/loginController.js';
import { notificationController } from './notifications/notificationsController.js';

const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const notifications = document.getElementById('notifications');

const showNotification = notificationController(notifications);

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginController(loginForm);
});

loginForm.addEventListener('login', (e) => {
  showNotification(e.detail.message, e.detail.type);
});
