import { buildModal } from './confirmModalView';

export const confirmModalController = (modal) => {
  const showModal = (message) => {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('confirm-modal');
    modalContainer.innerHTML = buildModal(message);
    modal.appendChild(modalContainer);
  };

  return showModal;
};
