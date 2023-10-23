/**
 * Get URL Query Parameters as an Object
 *
 * This function retrieves and converts the URL's query parameters into an object.
 *
 * @returns {Object} - An object containing the query parameters and their values.
 */
export const getSearchParams = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};
