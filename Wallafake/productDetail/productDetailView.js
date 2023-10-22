export const buildProduct = (product) => {
  return `
  <div class="product-card">
    <img src="${
      product.image
    }" alt="product image"  class="img" onerror="this.src='../assets/images/no-image-available.webp'"/>
      <div class="product-content">
        <span>Name: ${product.name}</span>
        <span>Description: ${product.description}</span>
        <p>Price: ${product.price}€</p>
        <p class=${product.for.toLowerCase()}>${product.for}</p>
      </div>
  </div>
    `;
};

export const errorMessage = (href) => {
  return `
  <div>
    <p class="alert error">There was an error, try again later</p>
    <a href=${href} class="btn">RETRY</a>
  </div>
  `;
};
