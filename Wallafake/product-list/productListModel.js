export const getProducts = async () => {
  const url = 'http://localhost:8000/api/products?_expand=user';
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok)
      throw new Error('Error fetching products, try again later');

    return data;
  } catch (error) {
    throw error;
  }
};
