import { buildMenuItem } from './menuView.js';
import { authenticatedItems, unauthenticatedItems } from './menuModel.js';

export const menuController = (menuContainer, activeItem) => {
  if (localStorage.getItem('accessToken')) {
    renderMenuItems(menuContainer, authenticatedItems, activeItem);
    logoutEvent();
  } else {
    renderMenuItems(menuContainer, unauthenticatedItems, activeItem);
  }
};

const renderMenuItems = (menuContainer, menuItems, activeItem) => {
  const menuLinks = document.createElement('div');
  menuLinks.classList.add('menu-items');
  menuItems.forEach((item) => {
    const menuItem = buildMenuItem(activeItem, item);
    menuLinks.appendChild(menuItem);
  });
  menuContainer.appendChild(menuLinks);
};

const logoutEvent = () => {
  const logout = document.getElementById('logout');
  logout.addEventListener('click', () => {
    localStorage.removeItem('accessToken');
  });
};
