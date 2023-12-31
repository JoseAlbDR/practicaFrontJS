import { buildModal } from './confirmModalView.js';

/**
 * Confirm Modal Controller Function
 *
 * This function creates a controller for a confirm modal dialog.
 * It allows showing a message in the modal, handling confirm and cancel actions,
 * and provides a way to execute a custom handler upon confirmation.
 *
 * @param {HTMLElement} modal - The HTML element representing the modal container.
 *
 * @returns {Function} - A function that shows the modal with a message and allows a custom handler.
 */
export const confirmModalController = (modal) => {
  // Create a modal container within the provided 'modal' element.
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('confirm-modal');
  modalContainer.id = 'modal';

  // Populate the modal container
  modalContainer.innerHTML = buildModal();
  modal.appendChild(modalContainer);

  const confirmBtn = modal.querySelector('#confirm-btn');
  const cancelBtn = modal.querySelector('#cancel-btn');

  cancelBtn.addEventListener('click', () => {
    modal.classList.remove('visible');
  });

  document.addEventListener('click', (e) => {
    const targetId = e.target.id;
    if (targetId === 'modal' || targetId === 'cancel-btn')
      modal.classList.remove('visible');
    return;
  });

  /**
   * Show Modal Function
   *
   * Displays the specified message in the modal and allows the execution of a custom handler upon confirmation.
   *
   * @param {string} message - The message to be displayed in the modal.
   * @param {Function} handler - A custom handler function to execute on confirmation.
   */
  const showModal = (message, handler) => {
    modalContainer.querySelector('#modal-message').textContent = message;
    modal.classList.add('visible');

    confirmBtn.addEventListener('click', async () => {
      modal.classList.remove('visible');
      await handler();
    });
  };

  return showModal;
};
