/**
 * Create Custom Event Function
 *
 * This function creates a custom event with the specified name and data.
 *
 * @param {string} name - The name of the custom event.
 * @param {Object} data - An object containing data to be included in the event's detail.
 * @returns {CustomEvent} - The custom event with the specified name and data.
 */
const createCustomEvent = (name, { type, message, handler }) => {
  const event = new CustomEvent(name, {
    detail: {
      type,
      message,
      handler,
    },
  });
  return event;
};

/**
 * Dispatch Custom Event Function
 *
 * This function dispatches a custom event with the specified name, data, and target element.
 *
 * @param {string} eventName - The name of the custom event to dispatch.
 * @param {Object} data - An object containing data to be included in the event's detail.
 * @param {HTMLElement} element - The target element to dispatch the custom event to.
 */
export const dispatchCustomEvent = (eventName, data, element) => {
  const event = createCustomEvent(eventName, { ...data });
  element.dispatchEvent(event);
};

/**
 * Error Message Event Function
 *
 * This function dispatches a custom event with an error type and a specified error message.
 *
 * @param {string} eventName - The name of the custom event to dispatch.
 * @param {string} message - The error message to include in the event's detail.
 * @param {HTMLElement} element - The target element to dispatch the custom event to.
 */
export const errorMessageEvent = (eventName, message, element) => {
  dispatchCustomEvent(
    eventName,
    {
      type: 'error',
      message: message || 'There was an error, try again later',
    },
    element
  );
};

/**
 * Success Message Event Function
 *
 * This function dispatches a custom event with a success type and a specified success message.
 *
 * @param {string} eventName - The name of the custom event to dispatch.
 * @param {string} message - The success message to include in the event's detail.
 * @param {HTMLElement} element - The target element to dispatch the custom event to.
 */
export const successMessageEvent = (eventName, message, element) => {
  dispatchCustomEvent(
    eventName,
    {
      type: 'success',
      message: message,
    },
    element
  );
};
