import { buildSpinner } from './spinnerView.js';

export const spinnerController = (spinner) => {
  const showSpinner = () => {
    spinner.innerHTML = buildSpinner();
  };
  const hideSpinner = () => {
    spinner.innerHTML = '';
  };

  return { showSpinner, hideSpinner };
};
