// Import the function for building notifications.
import { buildNotification } from './notificationsView.js';

/**
 * Notification Controller Function
 *
 * This function creates and displays notifications with specified messages and types.
 *
 * @param {HTMLElement} notifications - The container for displaying notifications.
 *
 * @returns {function} - A function that shows notifications with specified messages and types.
 */

export const notificationController = (notifications) => {
  /**
   * Show Notification Function
   *
   * This inner function creates and displays a notification with the given message and type.
   *
   * @param {string} message - The message to be displayed in the notification.
   * @param {string} type - The type of the notification (e.g., 'success', 'error', etc.).
   */
  const showNotification = (message, type) => {
    const notificationContainer = document.createElement('div');
    notificationContainer.innerHTML = buildNotification(message, type);

    notifications.appendChild(notificationContainer);

    setTimeout(() => {
      notificationContainer.innerHTML = '';
    }, 2000);
  };

  return showNotification;
};
