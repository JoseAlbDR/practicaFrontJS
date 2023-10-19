import { buildModal } from './confirmModalView.js';

export const confirmModalController = (modal) => {
  const showModal = (message, handler) => {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('confirm-modal');
    modalContainer.id = 'modal';
    modalContainer.innerHTML = buildModal(message);
    modal.appendChild(modalContainer);

    const confirmBtn = modal.querySelector('#confirm-btn');
    const cancelBtn = modal.querySelector('#cancel-btn');

    confirmBtn.addEventListener('click', async () => {
      modal.innerHTML = '';
      await handler();
    });

    cancelBtn.addEventListener('click', () => {
      modal.innerHTML = '';
    });

    document.addEventListener('click', (e) => {
      const targetId = e.target.id;
      if (targetId === 'modal' || targetId === 'cancel-btn')
        modal.innerHTML = '';
      return;
    });
  };

  return showModal;
};
