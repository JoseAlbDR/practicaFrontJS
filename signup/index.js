import { registerController } from './signupController.js';
import { notificationController } from '../notifications/notificationsController.js';
import { spinnerController } from '../spinner/spinnerController.js';

document.addEventListener('DOMContentLoaded', () => {
  // Needed DOM nodes
  const registerForm = document.getElementById('register-form');
  const notifications = document.getElementById('notifications');
  const spinner = document.getElementById('spinner');

  // Notifications
  const showNotification = notificationController(notifications);

  // Loader/Spinner
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  // Event Listeners
  registerForm.addEventListener('signup', (e) => {
    showNotification(e.detail.message, e.detail.type);
  });

  registerForm.addEventListener('signUpStart', () => {
    showSpinner();
  });

  registerForm.addEventListener('signUpEnd', () => {
    hideSpinner();
  });

  // Controller
  registerController(registerForm);
});
