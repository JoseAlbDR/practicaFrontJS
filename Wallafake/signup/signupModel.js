export const registerUser = async (userData) => {
  const url = 'http://localhost:8000/auth/register';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
