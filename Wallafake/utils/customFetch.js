import { BASE_URL } from './const';

const customFetch = {
  get: async (endPoint) => {
    const url = BASE_URL + endPoint;
    try {
      const response = await fetch(url);
    } catch (error) {}
  },
};
