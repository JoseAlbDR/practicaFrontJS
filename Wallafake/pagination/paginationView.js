export const buildPagination = (page) => {
  return `
    <button type="submit" id="previous-page" class="btn prev-btn">Previous Page</button>
    <button id="current-page" class="btn page-btn">${page}</button>
    <button type="submit" id="next-page" class="btn next-btn">Next Page</button>
  `;
};
