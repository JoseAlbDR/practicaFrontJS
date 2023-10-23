import { LIMIT } from '../config/const.js';

export const filterParams = (params) => {
  if (params.name === 'any' || params.name === '') delete params.name;
  if (params.for === 'all') delete params.for;
  if (!params._limit) params._limit = LIMIT;
};
