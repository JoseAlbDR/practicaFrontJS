/**
 * Disable Form Function
 *
 * This function disables all input elements, buttons, textareas, and select elements
 * within the provided form, preventing user interactions.
 *
 * @param {HTMLFormElement} form - The form element to be disabled.
 */
export const disableForm = (form) => {
  for (const element of form.elements) {
    if (
      element.tagName === 'INPUT' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'TEXTAREA' ||
      element.tagName === 'SELECT'
    ) {
      element.disabled = true;
    }
  }
};
