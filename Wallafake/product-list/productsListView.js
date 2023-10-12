export const emptyProducts = () => {
  return `
    <h3>No products to display...</h3>
  `;
};

export const buildProduct = (product) => {
  return `
    <img src="${product.image}" alt="product image"  />
    <span>${product.name}</span>
    <span>${product.description}</span>
    <p>${product.price}</p>
    <p>${product.for}</p>
  `;
};
