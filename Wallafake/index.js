import { registerController } from './register/registerController.js';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

registerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  registerController(registerForm);
});
