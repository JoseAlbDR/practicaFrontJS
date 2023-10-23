import { RESOURCE_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

/**
 * Create Product Function
 *
 * This function sends a request to create a new product with the provided data.
 *
 * @param {Object} product - The product data to be created.
 * @param {string} token - The user's authentication token for authorization.
 */
export const createProduct = async (product, token) => {
  await customFetch.post(RESOURCE_ENDPOINT, {
    body: product,
    auth: `Bearer ${token}`,
  });
};

/**
 * Update Product Function
 *
 * This function sends a request to update an existing product with the provided data.
 *
 * @param {Object} product - The updated product data.
 * @param {string} token - The user's authentication token for authorization.
 * @param {string} id - The unique identifier of the product to update.
 *
 * @returns {Object} - The response from the server after updating the product.
 */
export const updateProduct = async (product, token, id) => {
  const url = `${RESOURCE_ENDPOINT}/${id}`;

  const response = await customFetch.patch(url, {
    body: product,
    auth: `Bearer ${token}`,
  });

  return response;
};

/**
 * Get Product Data
 *
 * This function retrieves detailed product information, including the name, image,
 * description, price, and type, for a specific product ID from the server.
 *
 * @param {string} id - The unique identifier of the product to retrieve.
 *
 * @returns {Object} - An object containing the retrieved product data.
 */
export const getProduct = async (id) => {
  const url = `${RESOURCE_ENDPOINT}/${id}?_expand=user`;
  const data = await customFetch.get(url);
  const product = {
    name: data.name,
    image: data.image,
    description: data.description,
    price: data.price,
    for: data.for,
  };
  return product;
};
