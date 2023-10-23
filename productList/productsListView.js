export const emptyProducts = () => {
  return `
    <h3>No products to display...</h3>
  `;
};

export const errorMessage = () => {
  return `
  <div>
    <p class="alert error">There was an error, try again later</p>
    <a href="/" class="btn">RETRY</a>
  </div>
  `;
};

export const buildProduct = (product) => {
  return `
  <a href="./product-detail.html?id=${product.id}" class="product-card">
    <img src="${
      product.image
    }" alt="product image"  class="img" onerror="this.src='../assets/images/no-image-available.webp'"/>
    <div class="product-content">
      <span class="product-name">Name: ${product.name}</span>
      <span>Description: ${product.description}</span>
      <p>Price: ${product.price}€</p>
      <p class=${product.for.toLowerCase()}>${product.for}</p>
    </div>
  </a>
  `;
};
