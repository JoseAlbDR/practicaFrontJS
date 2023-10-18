import { menuController } from '../menu/menuController.js';
import { productDetailController } from './productDetailController.js';

document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menu');
  menuController(menuContainer, '');
  const productDetail = document.getElementById('product-detail');

  productDetailController(productDetail);
});
