/**
 * Build Menu Item Function
 *
 * This function creates an HTML menu item element based on the provided data.
 *
 * @param {string} activeItem - The identifier of the currently active menu item.
 * @param {object} item - An object representing the menu item with properties such as 'name', 'href', and 'id'.
 *
 * @returns {HTMLAnchorElement} - The HTML anchor element representing the menu item.
 */
export const buildMenuItem = (activeItem, item) => {
  const menuItem = document.createElement('a');
  menuItem.textContent = item.name;
  menuItem.href = item.href;
  menuItem.id = item.id;
  activeItem === item.id ? (menuItem.className = 'active') : null;

  return menuItem;
};
