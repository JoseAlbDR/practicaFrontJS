export const buildMenuItem = (activeItem, item) => {
  const menuItem = document.createElement('a');
  menuItem.textContent = item.name;
  menuItem.href = item.href;
  menuItem.id = item.id;
  activeItem === item.id ? (menuItem.className = 'active') : null;
  return menuItem;
};
