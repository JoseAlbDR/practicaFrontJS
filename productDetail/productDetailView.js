/**
 * Build Product Function
 *
 * This function generates an HTML representation of a product for display in the product detail view.
 *
 * @param {Object} product - The product data to be displayed.
 *
 * @returns {string} - The HTML code representing the product.
 */
export const buildProduct = (product) => {
  return `
    <div class="product-card">
      <img src="${
        product.image
      }" alt="product image" class="img" onerror="this.src='../assets/images/no-image-available.webp'"/>
      <div class="product-content">
        <span>Name: ${product.name}</span>
        <span>Description: ${product.description}</span>
        <p>Price: ${product.price}€</p>
        <p class=${product.for.toLowerCase()}>${product.for}</p>
      </div>
    </div>
  `;
};

/**
 * Error Message Function
 *
 * This function generates an error message with a retry link.
 *
 * @param {string} href - The URL to which the "RETRY" link points.
 *
 * @returns {string} - The HTML code representing the error message.
 */
export const errorMessage = (href) => {
  return `
    <div>
      <p class="alert error">There was an error, try again later</p>
      <a href=${href} class="btn">RETRY</a>
    </div>
  `;
};
