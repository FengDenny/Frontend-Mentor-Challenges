const backedProjectModalLogic = {
  backProjectClicked: document.getElementById("back-project"),

  handleBackProjectClicked() {
    this.backProjectClicked.addEventListener("click", () => {
      if (!document.getElementById("open-modal")) {
        backedProjectModalUI.createModalContent();
        backedProjectModalUI.modalContainer.style.opacity = "1";
      }
    });
  },
};

const backedProjectModalUI = {
  modalContainer: document.getElementById("modal-container"),

  createElement(tagName, attributes = {}, textContent = "") {
    const element = document.createElement(tagName);
    Object.keys(attributes).forEach((attribute) => {
      element.setAttribute(attribute, attributes[attribute]);
    });
    element.textContent = textContent;
    return element;
  },
  createHeadingH2(attributes) {
    return this.createElement("h2", attributes);
  },
  createParagraph(attributes) {
    return this.createElement("p", attributes);
  },

  createModalContent() {
    const modal = this.createElement("div", {
      id: "open-modal",
      class: "modal",
    });

    const modalHeading = this.createHeadingH2({ class: "modal-heading" });
    modalHeading.textContent = "Back this project";
    const modalParagrapgh = this.createParagraph({ class: "modal-paragraph" });
    modalParagrapgh.textContent =
      "Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?";

    modal.appendChild(modalHeading);
    modal.appendChild(modalParagrapgh);

    this.modalContainer.appendChild(modal);
  },
};

backedProjectModalLogic.handleBackProjectClicked();
