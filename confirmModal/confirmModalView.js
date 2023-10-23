/**
 * Build Modal Function
 *
 * This function generates the HTML structure for a confirmation modal.
 * It includes a message, information about irreversible actions, and confirm/cancel buttons.
 *
 * @returns {string} - The HTML structure for the confirmation modal as a string.
 */
export const buildModal = () => {
  return `
    <div class="modal-content">
      <header class="modal-header">
        <h5 id="modal-message"></h5>
        <p>This operation can't be undone</p>
      </header>
      <div class="modal-buttons">
        <button type="button" class="btn btn-block danger-btn" id="confirm-btn">Accept</button>
        <button type="button" class="btn btn-block" id="cancel-btn">Cancel</button>
      </div>
    </div>
  `;
};
