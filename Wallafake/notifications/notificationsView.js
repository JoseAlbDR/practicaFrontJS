export const buildNotification = (message, type) => {
  console.log(type);
  return `
  <div class="notification ${type}">
    <p>${message}</p>
  </div>
  `;
};
