// Import necessary constants and utility functions.
import { LIMIT } from '../config/const.js';
import {
  filterParams,
  getSearchParams,
  selectDefaultOption,
} from '../utils/index.js';

// Import the function to build the search form.
import { buildSearchForm } from './searchFormView.js';

/**
 * Search Controller Function
 *
 * This function controls the behavior of the search form, including form element values and reset functionality.
 *
 * @param {HTMLElement} searchForm - The container for the search form.
 */
export const searchController = (searchForm) => {
  searchForm.innerHTML = buildSearchForm();

  // Get the reset button element.
  const resetBtn = searchForm.querySelector('#reset-btn');
  resetBtn.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.location.href = url.toString();
  });

  const params = getSearchParams();
  // Delete default params (name=any, for=all) and set the default limit.
  filterParams(params);

  // Set values for search form elements after each search.
  const selectLimit = searchForm.querySelector('#limit');
  const inputName = searchForm.querySelector('#productName');
  const selectType = searchForm.querySelector('#search-type');

  // Populate the form elements with the search parameters.
  inputName.value = params.name || 'any';
  selectDefaultOption(selectLimit, params._limit || LIMIT);
  selectDefaultOption(selectType, params.for);

  // Convert the search parameter 'name' to lowercase for consistent matching.
  if (params.name) params.name = params.name?.toLowerCase();
};
