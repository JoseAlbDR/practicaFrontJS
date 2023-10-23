import {
  getSearchParams,
  dispatchCustomEvent,
  errorMessageEvent,
  LIMIT,
} from '../utils/index.js';
import { getNumProducts } from './paginationModel.js';
import { addDots, addPageButton, buildPagination } from './paginationView.js';

/**
 * Pagination Controller Function
 *
 * This function manages the pagination of product listings by constructing and displaying page buttons.
 *
 * @param {HTMLElement} pagination - The container for displaying pagination buttons.
 */
export const paginationController = async (pagination) => {
  const params = getSearchParams();

  const limit = params._limit || LIMIT;

  // Handle specific URL parameter cases.
  if (params.name === '' || params.name === 'any') delete params.name;
  if (params.for === 'all') delete params.for;
  delete params._limit;
  delete params._page;

  if (params.name) params.name = params.name?.toLowerCase();

  try {
    // Get the total number of products to calculate the number of pages.
    const numProducts = await getNumProducts(params);
    const numPages = Math.ceil(numProducts / limit);

    // If there are fewer than 2 pages, return as pagination is not needed.
    if (numPages < 2) return;

    // Get the current page from the URL, defaulting to 1 if no page parameter is present.
    let page = +getPage() || 1;

    // Return if the current page exceeds the total number of pages.
    if (page > numPages) return;

    // Build numbered page buttons.
    const pageButtons = buildPageButtons(numPages, page, pagination);

    // Clear the existing content of the pagination container.
    pagination.innerHTML = '';

    // Create previous and next buttons and render all buttons.
    const { prevButton, nextButton } = buildPagination(pageButtons, pagination);

    // Add event listeners to the previous and next buttons.
    prevButton.addEventListener('click', () => {
      if (page === 1) return;
      page--;
      setUrlPagination(page);
      dispatchCustomEvent('pageChanged', null, pagination);
      const searchParams = getSearchParams();
      paginationController(pagination, searchParams);
    });

    nextButton.addEventListener('click', () => {
      if (numPages === 0 || page === numPages) return;
      page++;
      setUrlPagination(page);
      dispatchCustomEvent('pageChanged', null, pagination);
      const searchParams = getSearchParams();
      paginationController(pagination, searchParams);
    });
  } catch (error) {
    errorMessageEvent('paginationLoaded', error.message, pagination);
  }
};

/**
 * Set URL Pagination Function
 *
 * This function updates the URL with the current page number.
 *
 * @param {number} page - The page number to set in the URL.
 */
const setUrlPagination = (page) => {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set('_page', page);
  window.history.pushState({}, '', currentURL);
};

/**
 * Add Click Listener Function
 *
 * This function adds a click event listener to a button that updates the URL and triggers page changes.
 *
 * @param {HTMLElement} button - The button element to which the click event is added.
 * @param {number} page - The page number associated with the button.
 * @param {HTMLElement} pagination - The container for displaying pagination buttons.
 */
const addClickListener = (button, page, pagination) =>
  button.addEventListener('click', () => {
    setUrlPagination(page);
    dispatchCustomEvent('pageChanged', null, pagination);
    const searchParams = getSearchParams();
    paginationController(pagination, searchParams);
  });

/**
 * Build Page Buttons Function
 *
 * This function creates and returns an array of page buttons for navigation.
 *
 * @param {number} numOfPages - The total number of pages.
 * @param {number} currentPage - The current page.
 * @param {HTMLElement} pagination - The container for displaying pagination buttons.
 *
 * @returns {HTMLElement[]} - An array of page buttons.
 */
const buildPageButtons = (numOfPages, currentPage, pagination) => {
  const pageBtns = [];

  // Create the first page button.
  const firstPageButton = addPageButton({
    pageNumber: 1,
    activeClass: currentPage === 1,
  });
  addClickListener(firstPageButton, 1, pagination);
  pageBtns.push(firstPageButton);

  // Add dots if currentPage is greater than 3.
  if (currentPage > 3) {
    pageBtns.push(addDots());
  }

  // Create a button for the page before the current page.
  if (currentPage !== 1 && currentPage !== 2) {
    const button = addPageButton({
      pageNumber: currentPage - 1,
      activeClass: false,
    });
    addClickListener(button, currentPage - 1, pagination);
    pageBtns.push(button);
  }

  // Create a button for the current page.
  if (currentPage !== 1 && currentPage !== numOfPages) {
    const button = addPageButton({
      pageNumber: currentPage,
      activeClass: true,
    });
    addClickListener(button, currentPage, pagination);
    pageBtns.push(button);
  }

  // Create a button for the page after the current page.
  if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
    const button = addPageButton({
      pageNumber: currentPage + 1,
      activeClass: false,
    });
    addClickListener(button, currentPage + 1, pagination);
    pageBtns.push(button);
  }

  // Add dots if currentPage is less than numOfPages - 2.
  if (currentPage < numOfPages - 2) {
    pageBtns.push(addDots());
  }

  // Create the last page button.
  const button = addPageButton({
    pageNumber: numOfPages,
    activeClass: currentPage === numOfPages,
  });
  addClickListener(button, numOfPages, pagination);
  pageBtns.push(button);

  return pageBtns;
};

/**
 * Get Page Function
 *
 * This function retrieves the current page number from the URL's query parameters.
 *
 * @returns {string | null} - The current page number or null if not found.
 */
export const getPage = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const page = searchParams.get('_page');
  return page;
};
