const createCustomEvent = (name, { type, message }) => {
  const event = new CustomEvent(name, {
    detail: {
      type: type,
      message: message,
    },
  });
  return event;
};

export const dispatchEvent = (eventName, data, element) => {
  const event = createCustomEvent(eventName, { ...data });
  element.dispatchEvent(event);
};
