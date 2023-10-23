// Import necessary constants and custom fetch utility.
import { RESOURCE_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

/**
 * Get Products Function
 *
 * This function retrieves a list of products based on specified search parameters.
 *
 * @param {Object} params - Search parameters to filter products.
 *
 * @returns {Promise<Object[]>} - A promise that resolves with an array of product objects.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
export const getProducts = async (params) => {
  const searchParams = new URLSearchParams(params);
  const endPoint = `${RESOURCE_ENDPOINT}?${searchParams.toString()}`;

  try {
    const products = await customFetch.get(endPoint);
    return products;
  } catch (error) {
    throw error;
  }
};
