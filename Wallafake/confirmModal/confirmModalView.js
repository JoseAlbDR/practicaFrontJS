export const buildModal = () => {
  return `
    <div class="confirm-modal">
      <div class="modal-content>
        <header class="modal-header">
          <h5>Are you sure that you want to delete the product?</h5>
          <p>This operation cant be undone</p>
        </header>
        <div class="modal-buttons">
          <button type="button" class="btn btn-block danger-btn" id="confirm-btn">Accept</button>
          <button type="button" class="btn btn-block " id="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  `;
};
