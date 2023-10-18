import { loginController } from './loginController.js';
import { notificationController } from '../notifications/notificationsController.js';
import { spinnerController } from '../spinner/spinnerController.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const notifications = document.getElementById('notifications');
  const spinner = document.getElementById('spinner');
  const showNotification = notificationController(notifications);
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  loginForm.addEventListener('login', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  loginForm.addEventListener('loginStart', () => {
    showSpinner();
  });

  loginForm.addEventListener('loginEnd', () => {
    hideSpinner();
  });

  loginController(loginForm);
});
