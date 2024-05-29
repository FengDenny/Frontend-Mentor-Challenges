const backedProjectModalLogic = {
  backProjectClicked: document.getElementById("back-project"),

  handleBackProjectClicked() {
    this.backProjectClicked.addEventListener("click", () => {
      if (!document.getElementById("open-modal")) {
        backedProjectModalUI.createModalContent();
        backedProjectModalUI.modalContainer.style.opacity = "1";
        backedProjectModalUI.modalContainer.style.pointerEvents = "auto";
        this.handleModalClose()
      }
    });
  },
  handleModalClose() {
    const closeButton = document.getElementById("close-modal")
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        backedProjectModalUI.modalContainer.style.opacity= "0";
        backedProjectModalUI.modalContainer.style.pointerEvents= "none";
        while (backedProjectModalUI.modalContainer.firstChild) {
          backedProjectModalUI.modalContainer.removeChild(backedProjectModalUI.modalContainer.firstChild);
        }
      });
    }
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

  createSVGElementNS(qualifiedName, attributes = {}, textContent = "") {
    const URI = "http://www.w3.org/2000/svg";
    const nsElement = document.createElementNS(
      URI,
      qualifiedName
    );
    Object.keys(attributes).forEach((attribute) => {
      nsElement.setAttribute(attribute, attributes[attribute]);
    });
    nsElement.textContent = textContent;
    return nsElement;
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

    const closeModalSVG = this.createSVGElementNS("svg", {
      id: "close-modal",
      class: "modal-close",
      width: "15",
      height: "15",
    });

    const path = this.createSVGElementNS("path", {
      d: "M11.314 0l2.828 2.828L9.9 7.071l4.243 4.243-2.828 2.828L7.07 9.9l-4.243 4.243L0 11.314 4.242 7.07 0 2.828 2.828 0l4.243 4.242L11.314 0z",
      fill: "#000",
      ["fill-rule"]: "evenodd",
      opacity: ".4",
    });

    closeModalSVG.appendChild(path);
    modal.appendChild(closeModalSVG);
    modal.appendChild(modalHeading);
    modal.appendChild(modalParagrapgh);

    this.modalContainer.appendChild(modal);
  },
};

const modal = {
  init() {
    backedProjectModalLogic.handleBackProjectClicked();
  },
};

modal.init();