import {
  getSearchParams,
  dispatchCustomEvent,
  errorMessageEvent,
  LIMIT,
} from '../utils/index.js';

import { getNumProducts } from './paginationModel.js';
import { addDots, addPageButton, buildPagination } from './paginationView.js';

export const paginationController = async (pagination) => {
  const params = getSearchParams();

  if (params.name === '') delete params.name;

  const limit = params._limit || LIMIT;

  delete params.limit;

  try {
    // Get num products to calculate num pages
    const numProducts = await getNumProducts(params);
    const numPages = Math.ceil(numProducts / limit);

    if (numPages < 2) return;

    // Get current page from url, default 1 if no page
    let page = +getPage() || 1;

    if (page > numPages) return;

    // Build numbered page buttons
    const pageButtons = buildPageButtons(numPages, page, pagination);

    pagination.innerHTML = '';

    // Create prev and next buttons and render all buttons
    const { prevButton, nextButton } = buildPagination(pageButtons, pagination);

    // Prev and Next buttons event listeners
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

const setUrlPagination = (page) => {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set('_page', page);
  window.history.pushState({}, '', currentURL);
};

const addClickListener = (button, page, pagination) =>
  button.addEventListener('click', () => {
    setUrlPagination(page);
    dispatchCustomEvent('pageChanged', null, pagination);
    const searchParams = getSearchParams();
    paginationController(pagination, searchParams);
  });

const buildPageButtons = (numOfPages, currentPage, pagination) => {
  const pageBtns = [];

  // first page
  const firstPageButton = addPageButton({
    pageNumber: 1,
    activeClass: currentPage === 1,
  });
  addClickListener(firstPageButton, 1, pagination);
  pageBtns.push(firstPageButton);

  // dots
  if (currentPage > 3) {
    pageBtns.push(addDots());
  }

  // one before current
  if (currentPage !== 1 && currentPage !== 2) {
    const button = addPageButton({
      pageNumber: currentPage - 1,
      activeClass: false,
    });
    addClickListener(button, currentPage - 1, pagination);
    pageBtns.push(button);
  }

  // current page
  if (currentPage !== 1 && currentPage !== numOfPages) {
    const button = addPageButton({
      pageNumber: currentPage,
      activeClass: true,
    });
    addClickListener(button, currentPage, pagination);
    pageBtns.push(button);
  }

  // one after current
  if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
    const button = addPageButton({
      pageNumber: currentPage + 1,
      activeClass: false,
    });
    addClickListener(button, currentPage + 1, pagination);
    pageBtns.push(button);
  }

  // dots
  if (currentPage < numOfPages - 2) {
    pageBtns.push(addDots());
  }

  // last page
  const button = addPageButton({
    pageNumber: numOfPages,
    activeClass: currentPage === numOfPages,
  });
  addClickListener(button, numOfPages, pagination);
  pageBtns.push(button);

  return pageBtns;
};

export const getPage = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const page = searchParams.get('_page');
  return page;
};
