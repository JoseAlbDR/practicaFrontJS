import { buildPagination } from './paginationView.js';

export const paginationController = (pagination) => {
  pagination.innerHTML = buildPagination();
};
