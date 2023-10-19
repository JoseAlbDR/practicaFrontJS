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
  post: async (endPoint, payload) => {
    const url = BASE_URL + endPoint;

    const headers = {
      'Content-Type': 'application/json',
    };

    const { body, auth } = payload;

    if (auth) {
      headers.Authorization = auth;
    }

    const requestOptions = {
      method: 'POST',
      headers,
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
  delete: async (endPoint) => {
    const url = BASE_URL + endPoint;
    const token = localStorage.getItem('accessToken');
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || 'Error deleting product, try again later'
        );
      }
    } catch (error) {
      throw error;
    }
  },
};
