import { buildModal } from './confirmModalView.js';

export const confirmModalController = (modal) => {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('confirm-modal');
  modalContainer.id = 'modal';
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
