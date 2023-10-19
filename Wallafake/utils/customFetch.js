import { BASE_URL } from './index.js';

export const customFetch = {
  get: async (endPoint) => {
    const url = BASE_URL + endPoint;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok)
        throw new Error(
          data.message || 'Error fetching products, try again later'
        );

      return data;
    } catch (error) {
      throw error;
    }
  },
  post: async (endPoint, body) => {
    const url = BASE_URL + endPoint;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || 'Error creating product, try again later'
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
};
