const createCustomEvent = (name, { type, message }) => {
  const event = new CustomEvent(name, {
    detail: {
      type: type,
      message: message,
    },
  });
  return event;
};

export const dispatchCustomEvent = (eventName, data, element) => {
  const event = createCustomEvent(eventName, { ...data });
  element.dispatchEvent(event);
};

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