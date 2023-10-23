/**
 * Filter URL Parameters
 *
 * This function filters and updates a set of URL parameters, removing default
 * values such as "name=any" or "for=all" and setting a default limit if not provided.
 *
 * @param {Object} params - The URL parameters to filter and modify.
 */
export const filterParams = (params) => {
  if (params.name === 'any' || params.name === '') delete params.name;
  if (params.for === 'all') delete params.for;
  if (!params._limit) params._limit = LIMIT;
};
