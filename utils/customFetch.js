import { BASE_URL } from './index.js';

export const customFetch = {
  /**
   * Custom Fetch - Get Function
   *
   * This function performs a GET request to the specified endpoint.
   *
   * @param {string} endPoint - The endpoint URL for the GET request.
   * @returns {Promise} - A promise that resolves to the data fetched from the endpoint.
   * @throws {Error} - An error is thrown if the request fails.
   */
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

  /**
   * Custom Fetch - Post Function
   *
   * This function performs a POST request to the specified endpoint with optional authentication.
   *
   * @param {string} endPoint - The endpoint URL for the POST request.
   * @param {Object} payload - The request payload including the body and optional auth header.
   * @returns {Promise} - A promise that resolves to the response data from the POST request.
   * @throws {Error} - An error is thrown if the request fails.
   */
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

  /**
   * Custom Fetch - Patch Function
   *
   * This function performs a PATCH request to the specified endpoint with optional authentication.
   *
   * @param {string} endPoint - The endpoint URL for the PATCH request.
   * @param {Object} payload - The request payload including the body and optional auth header.
   * @returns {Promise} - A promise that resolves to the response data from the PATCH request.
   * @throws {Error} - An error is thrown if the request fails.
   */
  patch: async (endPoint, payload) => {
    const url = BASE_URL + endPoint;

    const headers = {
      'Content-Type': 'application/json',
    };

    const { body, auth } = payload;

    const requestOptions = {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || 'Error updating product, try again later'
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Custom Fetch - Delete Function
   *
   * This function performs a DELETE request to the specified endpoint with authentication.
   *
   * @param {string} endPoint - The endpoint URL for the DELETE request.
   * @returns {Promise} - A promise that resolves when the DELETE request is successful.
   * @throws {Error} - An error is thrown if the request fails.
   */
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
