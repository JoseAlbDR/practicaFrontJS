import { RESOURCE_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

/**
 * Get Number of Products Function
 *
 * This function retrieves the number of products based on specified search parameters.
 *
 * @param {Object} params - Search parameters to filter products.
 *
 * @returns {Promise<number>} - A promise that resolves with the number of products.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
export const getNumProducts = async (params) => {
  const searchParams = new URLSearchParams(params);

  const endPoint = `${RESOURCE_ENDPOINT}?${searchParams.toString()}`;

  const products = await customFetch.get(endPoint);

  return products.length;
};
