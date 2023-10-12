import { menuItems } from './menuModel.js';
import { buildMenuItem } from './menuView.js';

export const menuController = (menuContainer, activeItem) => {
  const menuLinks = document.createElement('div');
  menuLinks.classList.add('menu-items');
  menuItems.forEach((item) => {
    const menuItem = buildMenuItem(activeItem, item);
    menuLinks.appendChild(menuItem);
  });
  menuContainer.appendChild(menuLinks);
};
