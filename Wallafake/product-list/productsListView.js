export const emptyProducts = () => {
  return `
    <h3>No products to display...</h3>
  `;
};

export const buildProduct = (product) => {
  return `
  <a href="./products.html?id=${product.id}">
    <img src="${product.image}" alt="product image"  class="img"/>
    <span>Name: ${product.name}</span>
    <span>Description: ${product.description}</span>
    <p>Price: ${product.price}€</p>
    <p class=${product.for.toLowerCase()}>${product.for}</p>
  </a>
  `;
};
