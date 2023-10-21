import { LIMIT, getSearchParams } from '../utils/index.js';
import { dispatchCustomEvent } from '../utils/customEvent.js';
import { getNumProducts } from './paginationModel.js';
import { addDots, addPageButton, buildPagination } from './paginationView.js';

export const paginationController = async (pagination, params) => {
  const numProducts = await getNumProducts(params);
  const numPages = Math.ceil(numProducts / LIMIT);
  if (numPages < 2) return;

  let page = +getPage() || 1;
  const pageButtons = buildPageButtons(numPages, page);

  buildPagination(pageButtons, pagination);

  const prevBtn = pagination.querySelector('#prev-page');
  const nextBtn = pagination.querySelector('#next-page');
  const currentPage = pagination.querySelector('.btn-container');

  pageButtons.forEach((button) => {
    currentPage.appendChild(button);
  });

  prevBtn.addEventListener('click', () => {
    if (page === 1) return;
    page--;
    setUrlPagination(page);
    dispatchCustomEvent('pageChanged', null, pagination);
    const searchParams = getSearchParams();
    paginationController(pagination, searchParams);
  });

  nextBtn.addEventListener('click', () => {
    if (numPages === 0 || page === numPages) return;
    page++;
    setUrlPagination(page);
    dispatchCustomEvent('pageChanged', null, pagination);
    const searchParams = getSearchParams();
    paginationController(pagination, searchParams);
  });
};

const setUrlPagination = (page) => {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set('_page', page);
  window.history.pushState({}, '', currentURL);
};

const buildPageButtons = (numOfPages, currentPage) => {
  const pageBtns = [];

  // first page
  pageBtns.push(
    addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
  );

  // dots
  if (currentPage > 3) {
    pageBtns.push(addDots());
  }

  // one before current
  if (currentPage !== 1 && currentPage !== 2) {
    pageBtns.push(
      addPageButton({
        pageNumber: currentPage - 1,
        activeClass: false,
      })
    );
  }

  // current page
  if (currentPage !== 1 && currentPage !== numOfPages) {
    pageBtns.push(
      addPageButton({
        pageNumber: currentPage,
        activeClass: true,
      })
    );
  }

  // one after current
  if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
    pageBtns.push(
      addPageButton({
        pageNumber: currentPage + 1,
        activeClass: false,
      })
    );
  }

  if (currentPage < numOfPages - 2) {
    pageBtns.push(addDots());
  }

  // last page
  pageBtns.push(
    addPageButton({
      pageNumber: numOfPages,
      activeClass: currentPage === numOfPages,
    })
  );

  return pageBtns;
};

export const getPage = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const page = searchParams.get('_page');
  return page;
};
