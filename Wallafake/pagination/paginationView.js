export const buildPagination = (pageButtons, pagination) => {
  const prevButton = buildStepButton('prev');
  const nextButton = buildStepButton('next');
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-container');

  pageButtons.forEach((button) => {
    btnContainer.appendChild(button);
  });

  pagination.appendChild(prevButton);
  pagination.appendChild(btnContainer);
  pagination.appendChild(nextButton);

  return { prevButton, nextButton };
};

export const addPageButton = ({ pageNumber, activeClass }) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'page-btn');
  if (activeClass) button.classList.add('active');
  button.textContent = pageNumber;
  return button;
};

export const addDots = () => {
  const dots = document.createElement('span');
  dots.classList.add('page-btn', 'dots');
  dots.textContent = '...';
  return dots;
};

const buildStepButton = (type) => {
  const button = document.createElement('button');
  button.id = `${type}-page`;
  button.type = 'submit';
  button.classList.add('btn', `${type}-btn`);
  button.innerText = `${type} Page`;
  return button;
};
