import { loginController } from './login/loginController.js';

const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginController(loginForm);
});
