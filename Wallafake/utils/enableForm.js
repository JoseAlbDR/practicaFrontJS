export const enableForm = (form) => {
  for (const element of form.elements) {
    if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
      element.disabled = false;
    }
  }
};
