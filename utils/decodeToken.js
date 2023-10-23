/**
 * Decode Token Function
 *
 * This function decodes a JSON Web Token (JWT) and returns its payload.
 *
 * @param {string} token - The JWT to decode.
 * @returns {object|null} - The decoded token payload as an object or null if decoding fails.
 */
export const decodeToken = (token) => {
  let decodedToken;

  try {
    const stringifiedToken = atob(token.split('.')[1]);
    decodedToken = JSON.parse(stringifiedToken);
  } catch (error) {
    return null;
  }

  return decodedToken;
};
