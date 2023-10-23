/**
 * Get Product ID from URL
 *
 * This function extracts the product ID from the URL's query parameters.
 *
 * @returns {string|null} - The product ID if found in the query parameters, or null if not found.
 */
export const getProductId = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get('id');
  return id;
};
