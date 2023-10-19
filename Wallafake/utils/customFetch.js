import { BASE_URL } from './index.js';

export const customFetch = {
  get: async (endPoint) => {
    const url = BASE_URL + endPoint;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok)
        throw new Error('Error fetching products, try again later');

      return data;
    } catch (error) {
      throw error;
    }
  },
};
