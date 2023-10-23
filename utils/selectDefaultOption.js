/**
 * Select Default Option in a Dropdown
 *
 * This function sets the selected option in a dropdown (select element) to the
 * one with the specified value.
 *
 * @param {HTMLSelectElement} selectElement - The HTML select element to set the option in.
 * @param {string} value - The value of the option to be selected.
 */
export const selectDefaultOption = (selectElement, value) => {
  const options = selectElement.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === value) {
      selectElement.selectedIndex = i;
      return;
    }
  }
};
