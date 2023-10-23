export const selectDefaultOption = (selectElement, value) => {
  const options = selectElement.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === value) {
      selectElement.selectedIndex = i;
      return;
    }
  }
};
