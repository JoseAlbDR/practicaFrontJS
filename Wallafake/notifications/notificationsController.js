import { buildNotification } from './notificationsView.js';

export const notificationController = (notifications) => {
  const showNotification = (message, type) => {
    const notificationContainer = document.createElement('div');
    notificationContainer.innerHTML = buildNotification(message, type);
    notifications.appendChild(notificationContainer);
    setTimeout(() => {
      notificationContainer.innerHTML = '';
    }, 1000000000);
  };

  return showNotification;
};
