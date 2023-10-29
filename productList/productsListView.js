/**
 * Empty Products Function
 *
 * This function generates an HTML message when there are no products to display.
 *
 * @returns {string} - HTML content with a message indicating no products to display.
 */
export const emptyProducts = () => {
  return `
    <h3>No products to display...</h3>
  `;
};

/**
 * Error Message Function
 *
 * This function generates an HTML error message with a retry button.
 *
 * @returns {string} - HTML content with an error message and a retry button.
 */
export const errorMessage = () => {
  return `
  <div>
    <p class="alert error">There was an error, try again later</p>
    <a href="/" class="btn">RETRY</a>
  </div>
  `;
};

/**
 * Build Product Function
 *
 * This function generates HTML content to display a product card with its details.
 *
 * @param {Object} product - The product object containing details to display.
 *
 * @returns {string} - HTML content for displaying a product card.
 */
export const buildProduct = (product) => {
  return `
  <a href="./product-detail.html?id=${product.id}" class="product-card">
    <img src="${
      product.image
    }" alt="product image"  class="img" onerror="this.src='../assets/images/no-image-available.webp'"/>
    <div class="product-content">
      <span class="product-name">${product.name}</span>
      <p class="product-description">${product.description}</p>
      <span class="product-price">${product.price}€</span>
      <p class=${product.for.toLowerCase()}>${product.for}</p>
    </div>
  </a>
  `;
};
