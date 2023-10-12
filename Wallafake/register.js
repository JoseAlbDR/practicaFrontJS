import { registerController } from './register/registerController.js';

const registerForm = document.getElementById('register-form');
const registerBtn = document.getElementById('register-btn');

registerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  registerController(registerForm);
});
