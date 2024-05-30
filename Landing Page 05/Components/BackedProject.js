const backedProjectModalLogic = {
  backProjectClicked: document.getElementById("back-project"),

  handleBackProjectClicked() {
    this.backProjectClicked.addEventListener("click", () => {
      if (!document.getElementById("open-modal")) {
        backedProjectModalUI.createModalContent();
        backedProjectModalUI.modalContainer.style.opacity = "1";
        backedProjectModalUI.modalContainer.style.pointerEvents = "auto";
        this.handleModalClose();
      }
    });
  },
  handleModalClose() {
    const closeButton = document.getElementById("close-modal");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        backedProjectModalUI.modalContainer.style.opacity = "0";
        backedProjectModalUI.modalContainer.style.pointerEvents = "none";
        while (backedProjectModalUI.modalContainer.firstChild) {
          backedProjectModalUI.modalContainer.removeChild(
            backedProjectModalUI.modalContainer.firstChild
          );
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
    const nsElement = document.createElementNS(URI, qualifiedName);
    Object.keys(attributes).forEach((attribute) => {
      nsElement.setAttribute(attribute, attributes[attribute]);
    });
    nsElement.textContent = textContent;
    return nsElement;
  },

  createDiv(attributes, textContent) {
    return this.createElement("div", attributes, textContent);
  },
  createHeadingH2(attributes, textContent) {
    return this.createElement("h2", attributes, textContent);
  },
  createParagraph(attributes, textContent) {
    return this.createElement("p", attributes, textContent);
  },
  createInputType(attribute, textContent) {
    return this.createElement("input", attribute, textContent);
  },
  createLabel(attribute, textContent) {
    return this.createElement("label", attribute, textContent);
  },
  createSpan(attribute, textContent){
    return this.createElement("span", attribute, textContent)
  },

  createModalHeaderContent() {
    const modalHeading = this.createHeadingH2({ class: "modal-heading" });
    modalHeading.textContent = "Back this project";
    const modalParagraph = this.createParagraph({ class: "modal-paragraph" });
    modalParagraph.textContent =
      "Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?";

    return { modalHeading, modalParagraph };
  },

  createCloseModalButton() {
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
    
    return { closeModalSVG };
  },
  
  createPledgeNoReward(){
    const noReward = this.createModalBackedCard(
      "reward-none",
      "no-reward",
      "Pledge with no reward",
      "reward-none",
      "Pledge with no reward"
    );
    const noRewardP = this.createParagraph(
      {class:"backed-p"},
      `Choose to support us without a reward if you simply believe in our project. 
      As a backer, you will be signed up to receive product updates via email.`
    );

    const pledgeAmountContainer = this.createDiv({
      class:"pledge-input-container"
    })

    const dollarSignSpan = this.createSpan({
      class:"dollar-sign"
    }, "$")

    const pledgeAmountInput = this.createInputType({
      type: "number",
      id:"bamboo-stand",
      ["data-target"]: "bamboo-stand-pledge",
      min:"25",
      value:"25",
      step:"1", 
    })

    pledgeAmountContainer.appendChild(dollarSignSpan)
    pledgeAmountContainer.appendChild(pledgeAmountInput)
    noReward.appendChild(noRewardP)
    noReward.appendChild(pledgeAmountContainer)
    return {noReward}
  },

  createModalBackedCard(id, dataTarget, value, labelFor, textContent) {
    const cardContainer = this.createDiv({ class: "modal-card-container" });
    const inputLabelContainer = this.createDiv({
      class: "input-label-container",
    });
    const createInputRadio = this.createInputType({
      type: "radio",
      id,
      ["data-target"]: dataTarget,
      value,
    });
    const createLabel = this.createLabel({ for: labelFor }, textContent);

    inputLabelContainer.appendChild(createInputRadio);
    inputLabelContainer.appendChild(createLabel);
    cardContainer.appendChild(inputLabelContainer);

    return cardContainer;
  },



  createModalContent() {
    const modal = this.createDiv({
      id: "open-modal",
      class: "modal",
    });
    const { modalHeading, modalParagraph } = this.createModalHeaderContent();
    const { closeModalSVG } = this.createCloseModalButton();
    const {noReward} = this.createPledgeNoReward()

    modal.appendChild(closeModalSVG);
    modal.appendChild(modalHeading);
    modal.appendChild(modalParagraph);
    modal.appendChild(noReward);

    this.modalContainer.appendChild(modal);
  },
};

const modal = {
  init() {
    backedProjectModalLogic.handleBackProjectClicked();
  },
};

modal.init();
