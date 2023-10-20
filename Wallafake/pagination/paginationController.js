import { LIMIT } from '../utils/index.js';
import { dispatchCustomEvent } from '../utils/customEvent.js';
import { getNumProducts } from './paginationModel.js';
import { buildPagination } from './paginationView.js';

export const paginationController = async (pagination, params) => {
  pagination.innerHTML = buildPagination();
  const prevBtn = pagination.querySelector('#previous-page');
  const nextBtn = pagination.querySelector('#next-page');
  const currentPage = pagination.querySelector('#current-page');

  const numProducts = await getNumProducts(params);

  let page = 1;
  currentPage.innerText = page;

  prevBtn.addEventListener('click', () => {
    if (page === 1) return;
    page--;
    currentPage.innerText = page;
    setUrlPagination(page);
    dispatchCustomEvent('pageChanged', null, pagination);
  });

  nextBtn.addEventListener('click', () => {
    const numPages = Math.ceil(numProducts / LIMIT);
    if (numPages === 0 || page === numPages) return;
    page++;
    currentPage.innerText = page;
    setUrlPagination(page);
    dispatchCustomEvent('pageChanged', null, pagination);
  });
};

const setUrlPagination = (page) => {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set('_page', page);
  window.history.pushState({}, '', currentURL);
};
