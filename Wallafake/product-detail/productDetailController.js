import { getProduct } from './productDetailModel.js';

export const productDetailController = async (productDetail) => {
  const id = getProductId();
  try {
    const product = await getProduct(id);
    console.log(product);
  } catch (error) {
    console.log(error);
  }
};

const getProductId = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get('id');
  return id;
};
