function Modal(title, text) {
  this.title = title;
  (this.text = text), (this.modalElement = null), (this.overlay = null);
}

Modal.prototype.createModal = function () {
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.className = "modal";

  const titleElement = document.createElement("h2");
  titleElement.className = "modal-heading";
  titleElement.textContent = this.title;
  modal.appendChild(titleElement);

  const textElement = document.createElement("p");
  textElement.className = "modal-description";
  textElement.textContent = this.text;
  modal.appendChild(textElement);

  this.modalElement = modal;
  return modal;
};

Modal.prototype.createOverlay = function () {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  document.body.appendChild(overlay);
  return overlay;
};

Modal.prototype.addButton = function (button) {
  if (this.modalElement) {
    this.modalElement.appendChild(button);
  }
};

Modal.prototype.open = function () {
  document.body.appendChild(this.modalElement);
  this.overlay = this.createOverlay();
  // Use a timeout to ensure the class addition is processed after appending
  setTimeout(() => {
    this.modalElement.classList.add("show");
  }, 10); // Small delay to ensure the element is rendered
};

Modal.prototype.close = function () {
  if (this.modalElement) {
    this.modalElement.classList.remove("show");

    // Remove modal and overlay after the transition with duration
    setTimeout(() => {
      if (this.modalElement.parentElement) {
        document.body.removeChild(this.modalElement);
      }

      if (this.overlay) {
        document.body.removeChild(this.overlay);
      }
    }, 300); // Match the duration of the opacity transition
  }
};
export default Modal;
