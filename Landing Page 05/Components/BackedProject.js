import { backedProjectModalCompletedLogic } from "./BackedProjectCompleted";

export const backedProjectModalLogic = {
  backProjectClicked: document.getElementById("back-project"),

  handleBackProjectClicked() {
    this.backProjectClicked.addEventListener("click", () => {
      if (!document.getElementById("open-modal")) {
        backedProjectModalUI.createModalContent();
        backedProjectModalUI.modalContainer.style.opacity = "1";
        backedProjectModalUI.modalContainer.style.pointerEvents = "auto";
        this.handleModalClose();
        this.handlePledgeClicked();
      }
    });
  },
  handleModalClose() {
    const closeButton = document.getElementById("close-modal");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
       this.handleModalOnClose()
      });
    }
  },
  handleModalOnClose(){
    backedProjectModalUI.modalContainer.style.opacity = "0";
    backedProjectModalUI.modalContainer.style.pointerEvents = "none";
    while (backedProjectModalUI.modalContainer.firstChild) {
      backedProjectModalUI.modalContainer.removeChild(
        backedProjectModalUI.modalContainer.firstChild
      );
    }
  },


  handlePledgeClicked() {
    const pledge = document.querySelector("input[data-target='pledge']")
    const modalCardContainer = document.getElementById("modal-card-container");
    const pledgeContentContainer = document.getElementById("pledge-content-container")
   const  continuePledgeBtn = document.getElementById("continue-pledge")
    pledge.addEventListener('click', () => {
      let pledgeChecked =  pledge.checked
      if(pledge.checked && pledge.hasAttribute("data-was-checked")){
        pledge.checked = false
        pledgeChecked = pledge.checked
        modalCardContainer.style.border = ""
        pledgeContentContainer.classList.add("collapsed")
        pledgeContentContainer.classList.remove("expanded")
        pledge.removeAttribute("data-was-checked")
      }else{
        pledge.checked = true
        pledgeChecked = pledge.checked
        modalCardContainer.style.border = "2px solid hsl(176, 72%, 28%)"
        pledgeContentContainer.classList.remove("collapsed")
        pledgeContentContainer.classList.add("expanded")
        backedProjectModalCompletedLogic.handleContinuePledge(continuePledgeBtn, "open-modal")
        pledge.setAttribute("data-was-checked", true)
      }

      const contentHeight = pledgeChecked ? pledgeContentContainer.scrollHeight + "px" : "0";
      pledgeContentContainer.style.maxHeight = contentHeight;
    })
  },
};

export const backedProjectModalUI = {
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
  createSpan(attribute, textContent) {
    return this.createElement("span", attribute, textContent);
  },
  createCTA(attribute, textContent) {
    return this.createElement("button", attribute, textContent);
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

  createPledgeNoReward() {
    const noReward = this.createModalBackedCard(
      "no-reward",
      "pledge",
      "Pledge with no reward",
      "reward-none",
      "Pledge with no reward"
    );
    const noRewardP = this.createParagraph(
      { class: "backed-p" },
      `Choose to support us without a reward if you simply believe in our project. 
      As a backer, you will be signed up to receive product updates via email.`
    );

 

    const pledgeContent = this.createPledgeCTA("bamboo-stand", "25", "25");

    noReward.appendChild(noRewardP);
    noReward.appendChild(pledgeContent);
    return { noReward };
  },

  createPledgeCTA(id, min, value) {
    const pledgeAmountContainer = this.createDiv({
      class: "pledge-input-container",
    });

    const dollarSignSpan = this.createSpan(
      {
        class: "dollar-sign",
      },
      "$"
    );

    const pledgeAmountInput = this.createInputType({
      type: "number",
      id,
      min,
      value,
      step: 1,
    });

   

    const pledgeContentContainer = this.createDiv({
      class: "pledge-content-container collapsed",
      id:"pledge-content-container"
    });
    const pledgeContent = this.createDiv({
      class: "pledge-content",
    });

    const pledgeAmountCTA = this.createCTA(
      {
        id: "continue-pledge",
        class: "pledge-amount-cta",
      },
      "Continue"
    );

    const pleadgeAmountHeader = this.createHeadingH2(
      {
        class: "pledge-content-heading",
      },
      "Enter your pledge"
    );

    pledgeContentContainer.appendChild(pleadgeAmountHeader);
    pledgeContentContainer.appendChild(pledgeContent);
    pledgeAmountContainer.appendChild(dollarSignSpan);
    pledgeAmountContainer.appendChild(pledgeAmountInput);
    pledgeContent.appendChild(pledgeAmountContainer);
    pledgeContent.appendChild(pledgeAmountCTA);
    pledgeContentContainer.appendChild(pledgeContent);

    return pledgeContentContainer;
  },

  createModalBackedCard(id, dataTarget, value, labelFor, textContent) {
    const cardContainer = this.createDiv({ class: "modal-card-container", id:"modal-card-container" });
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
    const customRadio = this.createLabel({
      class:"custom-radio"
    })
    const innerRaidioCircle = this.createSpan({
      class:"inner-circle"
    })


    customRadio.appendChild(createInputRadio)
    customRadio.appendChild(innerRaidioCircle)
    inputLabelContainer.appendChild(customRadio);
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
    const { noReward } = this.createPledgeNoReward();

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
