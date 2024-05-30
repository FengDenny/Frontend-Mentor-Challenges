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
        this.handleModalOnClose();
      });
    }
  },
  handleModalOnClose() {
    backedProjectModalUI.modalContainer.style.opacity = "0";
    backedProjectModalUI.modalContainer.style.pointerEvents = "none";
    while (backedProjectModalUI.modalContainer.firstChild) {
      backedProjectModalUI.modalContainer.removeChild(
        backedProjectModalUI.modalContainer.firstChild
      );
    }
  },

  
  handlePledgeClicked() {
    const modalCardContainers = document.querySelectorAll(".modal-card-container[data-modal-container]");
    let currentPledgeInput = null;
    let currentContainer = null;
    let currentModalContainer = null;
  
    modalCardContainers.forEach((modalContainer) => {
      modalContainer.addEventListener("click", (event) => {
        if (event.target.matches("input[data-target='pledge']")) {
          const pledgeInput = event.target;
          const targetId = pledgeInput.id;
          const targetContainer = document.querySelector(`.pledge-content-container[data-target-id='${targetId}']`);
          const continuePledgeBtn = targetContainer.querySelector(`button[data-complete-id='${targetId}']`);
  
          // Close the previously opened container
          if (currentPledgeInput && currentPledgeInput !== pledgeInput) {
            currentPledgeInput.checked = false;
            currentContainer.classList.add("collapsed");
            currentContainer.classList.remove("expanded");
            delete currentPledgeInput.dataset.wasChecked;
            currentContainer.style.maxHeight = "0";
            currentModalContainer.style.border = "";
          }
  
          // Toggle the current input
          let pledgeChecked = pledgeInput.checked;
          if (pledgeInput.checked && pledgeInput.dataset.wasChecked) {
            pledgeInput.checked = false;
            pledgeChecked = pledgeInput.checked;
            modalContainer.style.border = "";
            targetContainer.classList.add("collapsed");
            targetContainer.classList.remove("expanded");
            delete pledgeInput.dataset.wasChecked;
          } else {
            pledgeInput.checked = true;
            pledgeChecked = pledgeInput.checked;
            modalContainer.style.border = "2px solid hsl(176, 72%, 28%)";
            targetContainer.classList.remove("collapsed");
            targetContainer.classList.add("expanded");
            pledgeInput.dataset.wasChecked = "true";
  
            if (continuePledgeBtn) {
              backedProjectModalCompletedLogic.handleContinuePledge(continuePledgeBtn, "open-modal");
            }
          }
  
          // Update the current input and container
          currentPledgeInput = pledgeInput;
          currentContainer = targetContainer;
          currentModalContainer = modalContainer;
  
          const contentHeight = pledgeChecked ? targetContainer.scrollHeight + "px" : "0";
          targetContainer.style.maxHeight = contentHeight;
        }
      });
    });
  }
  
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

  createPledgeNoReward(id) {
    const noReward = this.createModalBackedCard(
      id,
      "pledge",
      "Pledge with no reward",
      "Pledge with no reward"
    );
    const noRewardP = this.createParagraph(
      { class: "backed-p" },
      `Choose to support us without a reward if you simply believe in our project. 
      As a backer, you will be signed up to receive product updates via email.`
    );

    const pledgeContent = this.createPledgeCTA(id, "0", "0", "0", true);

    noReward.appendChild(noRewardP);
    noReward.appendChild(pledgeContent);
    return { noReward };
  },

  createPledgeBamboo(id) {
    // Pledge $25 or more
    // 101 left

    const bamboo = this.createModalBackedCard(
      id,
      "pledge",
      "Bamboo Stand",
      "Bamboo Stand"
    );
    const bambooP = this.createParagraph(
      { class: "backed-p" },
      `You get an ergonomic stand made of natural bamboo. 
      You've helped us launch our promotional campaign, and
      you’ll be added to a special Backer member list.`
    );

    const pledgeContent = this.createPledgeCTA(id, "25", "74", "25");

    bamboo.appendChild(bambooP);
    bamboo.appendChild(pledgeContent);
    return { bamboo };
  },

  createPledgeCTA(id = "", min = "", max = "", value = "", noReward = false) {
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
      name: id,
      ["data-input-id"]: id,
      ["aria-label"]: "Pledge amount",
      min,
      max,
      value,
      step: 1,
    });

    const pledgeContentContainer = this.createDiv({
      class: "pledge-content-container collapsed",
      ["data-target-id"]: id,
    });
    const pledgeContent = this.createDiv({
      class: "pledge-content",
    });

    const pledgeAmountCTA = this.createCTA(
      {
        class: "pledge-amount-cta",
        ["data-complete-id"]: id,
      },
      "Continue"
    );

    const pleadgeAmountHeader = this.createHeadingH2(
      {
        class: "pledge-content-heading",
      },
      "Enter your pledge"
    );

    if (noReward) {
      const pledgeContent = this.createDiv({
        class: "pledge-content-no-reward",
      });
      const pledgeAmountCTA = this.createCTA(
        {
          class: "pledge-no-reward-cta",
          ["data-complete-id"]: id,
        },
        "Continue"
      );
      pledgeContent.appendChild(pledgeAmountContainer);
      pledgeContent.appendChild(pledgeAmountCTA);
      pledgeContentContainer.appendChild(pledgeContent);
    } else {
      pledgeContentContainer.appendChild(pleadgeAmountHeader);
      pledgeContentContainer.appendChild(pledgeContent);
      pledgeAmountContainer.appendChild(dollarSignSpan);
      pledgeAmountContainer.appendChild(pledgeAmountInput);
      pledgeContent.appendChild(pledgeAmountContainer);
      pledgeContent.appendChild(pledgeAmountCTA);
      pledgeContentContainer.appendChild(pledgeContent);
    }

    return pledgeContentContainer;
  },

  createModalBackedCard(id, dataTarget, value, textContent) {
    const cardContainer = this.createDiv({
      class: "modal-card-container",
      ["data-modal-container"]: "modal-card-container",
    });
    const inputLabelContainer = this.createDiv({
      class: "input-label-container",
    });
    const createInputRadio = this.createInputType({
      type: "radio",
      id,
      ["data-target"]: dataTarget,
      value,
    });
    const createLabel = this.createSpan({ class: "span-label" }, textContent);
    const customRadio = this.createLabel({
      class: "custom-radio",
    });
    const innerRaidioCircle = this.createSpan({
      class: "inner-circle",
    });

    customRadio.appendChild(createInputRadio);
    customRadio.appendChild(innerRaidioCircle);
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
    const { noReward } = this.createPledgeNoReward("no-reward");
    const { bamboo } = this.createPledgeBamboo("bamboo-stand");

    modal.appendChild(closeModalSVG);
    modal.appendChild(modalHeading);
    modal.appendChild(modalParagraph);
    modal.appendChild(noReward);
    modal.appendChild(bamboo);

    this.modalContainer.appendChild(modal);
  },
};

const modal = {
  init() {
    backedProjectModalLogic.handleBackProjectClicked();
  },
};

modal.init();
