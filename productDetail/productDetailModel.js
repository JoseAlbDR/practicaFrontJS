import { RESOURCE_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

/**
 * Get Product Function
 *
 * This function retrieves product data for a specific product ID from the server.
 *
 * @param {string} id - The unique identifier of the product to retrieve.
 *
 * @returns {Object} - An object containing the retrieved product data.
 */
export const getProduct = async (id) => {
  const url = `${RESOURCE_ENDPOINT}/${id}?_expand=user`;

  const data = await customFetch.get(url);

  return data;
};

/**
 * Delete Product Function
 *
 * This function sends a request to delete a product with a specified ID from the server.
 *
 * @param {string} id - The unique identifier of the product to delete.
 */
export const deleteProduct = async (id) => {
  const url = `${RESOURCE_ENDPOINT}/${id}`;
  await customFetch.delete(url);
};
