import { createProductController } from './createProduct/createProductController.js';

const createForm = document.getElementById('create-form');
const createBtn = document.getElementById('create-btn');

createBtn.addEventListener('click', () => {
  createProductController(createForm);
});
