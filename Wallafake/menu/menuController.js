import { buildMenu } from './menuView.js';

export const menuController = (menu, activeItem) => {
  const menuItems = buildMenu(activeItem);
  menu.innerHTML = menuItems;
};

menu.addEventListener('click', (e) => {
  if (e.target.id !== 'logout') return;

  localStorage.removeItem('accessToken');

  setTimeout(() => {
    window.location.href = 'create-product.html';
  }, 1000);
});
