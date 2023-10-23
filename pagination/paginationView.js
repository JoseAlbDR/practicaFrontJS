/**
 * Build Pagination Function
 *
 * This function constructs the pagination section with page buttons and step buttons (previous and next).
 *
 * @param {HTMLElement[]} pageButtons - An array of page buttons.
 * @param {HTMLElement} pagination - The container for pagination elements.
 *
 * @returns {Object} - An object containing the previous and next buttons.
 */
export const buildPagination = (pageButtons, pagination) => {
  // Create the previous and next step buttons.
  const prevButton = buildStepButton('prev');
  const nextButton = buildStepButton('next');
  // Create a container for page buttons.
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-container');

  // Append each page button to the container.
  pageButtons.forEach((button) => {
    btnContainer.appendChild(button);
  });

  // Append the previous, page buttons, and next buttons to the pagination container.
  pagination.appendChild(prevButton);
  pagination.appendChild(btnContainer);
  pagination.appendChild(nextButton);

  return { prevButton, nextButton };
};

/**
 * Add Page Button Function
 *
 * This function creates a page button element with a page number and optional active class.
 *
 * @param {Object} config - Configuration object with pageNumber and activeClass properties.
 *
 * @returns {HTMLElement} - A page button element.
 */
export const addPageButton = ({ pageNumber, activeClass }) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'page-btn');
  if (activeClass) button.classList.add('active');
  button.textContent = pageNumber;
  return button;
};

/**
 * Add Dots Function
 *
 * This function creates a dots element to represent a range of pages.
 *
 * @returns {HTMLElement} - A dots element.
 */
export const addDots = () => {
  const dots = document.createElement('span');
  dots.classList.add('page-btn', 'dots');
  dots.textContent = '...';
  return dots;
};

/**
 * Build Step Button Function
 *
 * This function creates a step button (previous or next) for page navigation.
 *
 * @param {string} type - The type of step button, 'prev' or 'next'.
 *
 * @returns {HTMLElement} - A step button element.
 */
const buildStepButton = (type) => {
  const button = document.createElement('button');
  button.id = `${type}-page`;
  button.type = 'submit';
  button.classList.add('btn', `${type}-btn`);
  button.innerText = `${type === 'prev' ? 'Previous Page' : 'Next Page'}`;
  return button;
};
