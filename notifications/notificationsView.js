/**
 * Build Notification Function
 *
 * This function generates an HTML representation of a notification with a specified message and type.
 *
 * @param {string} message - The message to be displayed in the notification.
 * @param {string} type - The type of the notification (e.g., 'success', 'error', etc.).
 *
 * @returns {string} - The HTML code representing the notification.
 */
export const buildNotification = (message, type) => {
  return `
    <div class="notification alert ${type}">
      <p>${message}</p>
    </div>
  `;
};
