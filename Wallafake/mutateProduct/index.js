import { createProductController } from './mutateProductController.js';
import { notificationController } from '../notifications/notificationsController.js';
import { menuController } from '../menu/menuController.js';
import { spinnerController } from '../spinner/spinnerController.js';
import { getProductId } from '../utils/getProductId.js';

document.addEventListener('DOMContentLoaded', () => {
  const notifications = document.getElementById('notifications');
  const menuContainer = document.getElementById('menu');
  const spinner = document.getElementById('spinner');
  const backBtn = document.getElementById('back-btn');

  const showNotification = notificationController(notifications);
  const { showSpinner, hideSpinner } = spinnerController(spinner);

  const productId = getProductId();

  let currentProductForm;
  let mutationType;

  if (productId) {
    const updateForm = document.getElementById('update-form');
    currentProductForm = updateForm;
    mutationType = 'update';
  } else {
    const createForm = document.getElementById('create-form');
    currentProductForm = createForm;
    mutationType = 'create';
  }

  menuController(menuContainer, `${mutationType}Product`);

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

  createProductController(currentProductForm, productId);
});
