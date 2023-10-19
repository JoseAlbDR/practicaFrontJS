export const getSearchParams = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};
