export const getProduct = async (id) => {
  const url = `http://localhost:8000/api/products/${id}`;
  try {
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();

    if (!response.ok && response.status === 404)
      throw new Error('Error fetching product, try again later');

    return data;
  } catch (error) {
    throw error;
  }
};
