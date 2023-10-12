export const createCustomEvent = (name, type, message) => {
  const event = new CustomEvent(name, {
    detail: {
      type: type,
      message: message,
    },
  });
  return event;
};
