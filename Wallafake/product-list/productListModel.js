export const getProducts = async () => {
  const url = 'http://localhost:8000/api/products';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
