import { registerController } from './signupController.js';
import { notificationController } from '../notifications/notificationsController.js';
import { spinnerController } from '../spinner/spinnerController.js';

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const notifications = document.getElementById('notifications');
  const spinner = document.getElementById('spinner');
  const showNotification = notificationController(notifications);
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  registerForm.addEventListener('signup', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  registerForm.addEventListener('signUpStart', () => {
    showSpinner();
  });

  registerForm.addEventListener('signUpEnd', () => {
    hideSpinner();
  });

  registerController(registerForm);
});
