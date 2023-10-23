import { buildMenuItem } from './menuView.js';
import { authenticatedItems, unauthenticatedItems } from './menuModel.js';

/**
 * Menu Controller Function
 *
 * This function dynamically renders the menu items in the provided menu container based on the user's authentication status.
 *
 * @param {HTMLElement} menuContainer - The HTML element that will contain the menu items.
 * @param {string} activeItem - The identifier for the currently active menu item.
 */
export const menuController = (menuContainer, activeItem) => {
  // Authenticated menu items
  if (localStorage.getItem('accessToken')) {
    renderMenuItems(menuContainer, authenticatedItems, activeItem);
    logoutEvent();
  } else {
    // Not Authenticated
    renderMenuItems(menuContainer, unauthenticatedItems, activeItem);
  }
};

/**
 * Render Menu Items Function
 *
 * This function generates the HTML structure for menu items and appends them to the menu container.
 *
 * @param {HTMLElement} menuContainer - The HTML element that will contain the menu items.
 * @param {Array} menuItems - An array of menu items to be rendered.
 * @param {string} activeItem - The identifier for the currently active menu item.
 */
const renderMenuItems = (menuContainer, menuItems, activeItem) => {
  const menuLinks = document.createElement('div');
  menuLinks.classList.add('menu-items');

  menuItems.forEach((item) => {
    const menuItem = buildMenuItem(activeItem, item);
    menuLinks.appendChild(menuItem);
  });

  menuContainer.appendChild(menuLinks);
};

/**
 * Logout Event Function
 *
 * This function adds a click event listener to the logout button, allowing the user to log out by removing the access token from local storage.
 */
const logoutEvent = () => {
  const logout = document.getElementById('logout');

  logout.addEventListener('click', () => {
    localStorage.removeItem('accessToken');
  });
};
