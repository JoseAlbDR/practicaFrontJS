export const disableForm = (form) => {
  for (const element of form.elements) {
    if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
      element.disabled = true;
    }
  }
};
