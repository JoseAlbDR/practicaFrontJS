/**
 * Enable Form Function
 *
 * This function enables all input elements, buttons, textareas, and select elements
 * within the provided form, allowing user interactions.
 *
 * @param {HTMLFormElement} form - The form element to be enabled.
 */
export const enableForm = (form) => {
  for (const element of form.elements) {
    if (
      element.tagName === 'INPUT' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'TEXTAREA' ||
      element.tagName === 'SELECT'
    ) {
      element.disabled = false;
    }
  }
};
