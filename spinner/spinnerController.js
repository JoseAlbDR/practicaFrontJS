import { buildSpinner } from './spinnerView.js';

/**
 * Spinner Controller Function
 *
 * This function controls the display and removal of a loading spinner.
 *
 * @param {HTMLElement} spinner - The HTML element where the spinner will be displayed.
 */
export const spinnerController = (spinner) => {
  /**
   * Display the loading spinner.
   */
  const showSpinner = () => {
    spinner.innerHTML = buildSpinner();
  };

  /**
   * Remove the loading spinner.
   */
  const hideSpinner = () => {
    spinner.innerHTML = '';
  };

  return { showSpinner, hideSpinner };
};
