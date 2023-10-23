import { LIMIT } from '../config/const.js';
import {
  filterParams,
  getSearchParams,
  selectDefaultOption,
} from '../utils/index.js';

import { buildSearchForm } from './searchFormView.js';

export const searchController = (searchForm) => {
  searchForm.innerHTML = buildSearchForm();

  const resetBtn = searchForm.querySelector('#reset-btn');
  resetBtn.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.location.href = url.toString();
  });

  const params = getSearchParams();

  // Delete default params (name=any, for=all) set default limit
  filterParams(params);

  // Set values for search form after each search
  const selectLimit = searchForm.querySelector('#limit');
  const inputName = searchForm.querySelector('#productName');
  const selectType = searchForm.querySelector('#search-type');

  inputName.value = params.name || 'any';
  selectDefaultOption(selectLimit, params._limit || LIMIT);
  selectDefaultOption(selectType, params.for);

  if (params.name) params.name = params.name?.toLowerCase();
};
