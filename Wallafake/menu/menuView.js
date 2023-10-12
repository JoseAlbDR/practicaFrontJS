export const buildMenu = (activeItem) => {
  return `
    <div class="menu">
      <div class="menu-items">
        <a class="${
          activeItem === 'home' ? 'active' : ''
        }" href="/" id="home">Home</a>
        <a class="${
          activeItem === 'createProduct' ? 'active' : ''
        }" href="/create-product.html" id="createProduct">Create Product</a>
        <a href="/login.html" id="logout">Logout</a>
      </div>
    </div>
  `;
};
