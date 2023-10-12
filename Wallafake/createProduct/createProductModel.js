export const createProduct = async (product, token) => {
  const url = 'http://localhost:8000/api/products';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};
