import { backedProjectModalCompletedLogic } from "./BackedProjectCompleted";
import { Helpers, createElementsHelpers } from "./Helpers";
import { LocalStorage } from "./LocalStorage";

export const backedProjectLogic = {
  backProjectClicked: document.getElementById("back-project"),
  leftData: [
    {
      id: "bamboo-stand",
      ["project-about-id"]: "bamboo-select",
      amountLeft: 101,
    },
    {
      id: "black-edition-stand",
      ["project-about-id"]: "black-edition-select",
      amountLeft: 64,
    },
    {
      id: "mahogany-special-stand",
      ["project-about-id"]: "mahogany-special-select",
      amountLeft: 0,
    },
  ],

  handleBackProjectClicked(button) {
    button.addEventListener("click", (event) => {
      if (!document.getElementById("open-modal")) {
        backedProjectUI.createCardContent(backedProjectUI.modalContainer);
        backedProjectUI.modalContainer.style.opacity = "1";
        backedProjectUI.modalContainer.style.pointerEvents = "auto";
        this.handleModalClose();
        this.handlePledgeClicked(".card-container[data-container]");
      this.handlePledgeLeft("div[data-container]");
        // console.log(document.querySelector("button['data-complete-id']"))
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
    backedProjectUI.modalContainer.style.opacity = "0";
    backedProjectUI.modalContainer.style.pointerEvents = "none";
    while (backedProjectUI.modalContainer.firstChild) {
      backedProjectUI.modalContainer.removeChild(
        backedProjectUI.modalContainer.firstChild
      );
    }
  },
  handlePledgeLeft(query) {
    const cardContainer = document.querySelectorAll(query);
    cardContainer.forEach((card) => {
      const input = card.querySelector(`input[type="radio"]`);
      const inputID = input.id;
      const divElement = card.querySelector(`div[data-pledge-id]`);

      console.log(divElement && !divElement.hasChildNodes())

      const pledgeID =
        inputID !== "no-reward" &&
        inputID !== "no-reward-select" &&
        divElement.dataset.pledgeId;

      const updateData = this.leftData.map((item) => {
        if ( divElement && !divElement.hasChildNodes() && (item.id === pledgeID || item["project-about-id"] === pledgeID))  {
          const headingH2 = backedProjectUI.createHeadingH2(
            {
              class: "pledge-amount",
            },
            `${item.amountLeft}`
          );

          const span = backedProjectUI.createSpan(
            {
              class: "pledge-amount-span",
            },
            "left"
          );

          divElement.appendChild(headingH2);
          divElement.appendChild(span);

          return divElement;
        }
      });
      return updateData;
    });
  },

  handlePledgeClicked(query) {
    const cardContainer = document.querySelectorAll(query);
    let currentPledgeInput = null;
    let currentContainer = null;
    let currentModalContainer = null;

    cardContainer.forEach((modalContainer) => {
      modalContainer.addEventListener("click", (event) => {
        if (event.target.matches("input[data-target='pledge']")) {
          const pledgeInput = event.target;
          const targetId = pledgeInput.id;
          const targetContainer = document.querySelector(
            `.pledge-content-container[data-target-id='${targetId}']`
          );
          const continuePledgeBtn = targetContainer.querySelector(
            `button[data-complete-id='${targetId}']`
          );

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
              backedProjectModalCompletedLogic.handleContinuePledge(
                continuePledgeBtn,
                "open-modal"
              );
            }
          }

          // Update the current input and container
          currentPledgeInput = pledgeInput;
          currentContainer = targetContainer;
          currentModalContainer = modalContainer;

          Helpers.validateNumberInput();

          const contentHeight = pledgeChecked
            ? targetContainer.scrollHeight + "px"
            : "0";
          targetContainer.style.maxHeight = contentHeight;
        }
      });
    });
  },

  handlePledgeButtonContinueClicked(){
    pledgeAmountCTA = document.querySelector("button['data-complete-id']")
    console.log(pledgeAmountCTA)
  }


};

export const backedProjectUI = {
  modalContainer: document.getElementById("modal-container"),
  createSVGElementNS: createElementsHelpers.createSVGElementNS,
  createElement: createElementsHelpers.createElement,
  createDiv: createElementsHelpers.createDiv,
  createHeadingH2: createElementsHelpers.createHeadingH2,
  createParagraph: createElementsHelpers.createParagraph,
  createInputType: createElementsHelpers.createInputType,
  createLabel: createElementsHelpers.createLabel,
  createSpan: createElementsHelpers.createSpan,
  createCTA: createElementsHelpers.createCTA,

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
  createPledgeLeftAmount(id) {
    const pledgeAmount = this.createDiv({
      ["data-pledge-id"]: id,
    });

    return pledgeAmount;
  },

  createPledgeNoReward(id, container = "modal-container") {
    const noReward = this.createBackedCard(
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

    const pledgeContent =
      container !== "project-about"
        ? this.createPledgeCTA(id, "0", "0", "0", true)
        : this.createSelectReward();

    noReward.appendChild(noRewardP);
    noReward.appendChild(pledgeContent);
    return { noReward };
  },

  createPledgeBamboo(id, container = "modal-container") {
    const bamboo = this.createBackedCard(
      id,
      "pledge",
      "Bamboo Stand",
      "Bamboo Stand",
      "25"
    );
    const bambooP = this.createParagraph(
      { class: "backed-p" },
      `You get an ergonomic stand made of natural bamboo. 
      You've helped us launch our promotional campaign, and
      you’ll be added to a special Backer member list.`
    );

    const pledgeAmount = this.createPledgeLeftAmount(id);

    const pledgeContent =
      container !== "project-about"
        ? this.createPledgeCTA(id, "25", "74", "25")
        : this.createSelectReward();

    bamboo.appendChild(bambooP);
    bamboo.appendChild(pledgeAmount);
    bamboo.appendChild(pledgeContent);
    return { bamboo };
  },
  createPledgeBlackEdition(id, container = "modal-container") {
    const blackEdition = this.createBackedCard(
      id,
      "pledge",
      "Black Edition Stand",
      "Black Edition Stand",
      "75"
    );
    const blackEditionP = this.createParagraph(
      { class: "backed-p" },
      `  You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer 
      member list. Shipping is included.`
    );

    const pledgeAmount = this.createPledgeLeftAmount(id);

    const pledgeContent =
      container !== "project-about"
        ? this.createPledgeCTA(id, "75", "199", "75")
        : this.createSelectReward();

    blackEdition.appendChild(blackEditionP);
    blackEdition.appendChild(pledgeAmount);
    blackEdition.appendChild(pledgeContent);
    return { blackEdition };
  },
  createPledgeMahogany(id, container = "modal-container") {
    const mahogany = this.createBackedCard(
      id,
      "pledge",
      "Mahogany Special Edition",
      "Mahogany Special Edition",
      "200"
    );
    const mahoganyP = this.createParagraph(
      { class: "backed-p" },
      `  You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added 
      to our Backer member list. Shipping is included.`
    );

    const pledgeAmount = this.createPledgeLeftAmount(id);

    const pledgeContent =
      container !== "project-about"
        ? this.createPledgeCTA(id, "200", "300", "200")
        : this.createSelectReward();

    mahogany.appendChild(mahoganyP);
    mahogany.appendChild(pledgeAmount);
    mahogany.appendChild(pledgeContent);
    return { mahogany };
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
      required: true,
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

  createBackedCard(id, dataTarget, value, textContent, dollarAmount = "") {
    const cardContainer =
      id === "mahogany-special-stand" || id === "mahogany-special-select"
        ? this.createDiv({
            class: "card-container mahogany-special",
            ["data-container"]: "card-container",
          })
        : this.createDiv({
            class: "card-container",
            ["data-container"]: "card-container",
          });
    const inputLabelContainer = this.createDiv({
      class: "input-label-container",
    });

    const headerContainer = this.createDiv({
      class: "header-container",
    });

    const createInputRadio = this.createInputType({
      type: "radio",
      id,
      ["data-target"]: dataTarget,
      value,
    });
    const createLabel = this.createSpan({ class: "span-label" }, textContent);
    const customRadio =
      id === "no-reward" && id == "no-reward-select"
        ? this.createLabel({
            class: "custom-radio",
            ["data-id"]: id,
          })
        : this.createLabel({
            class: "custom-radio-others",
            ["data-id"]: id,
          });

    const innerRaidioCircle = this.createSpan({
      class: "inner-circle",
    });

    const pledgeAmountHeading = this.createHeadingH2(
      {
        class: "pledge-amount-heading",
      },
      `Pledge $${dollarAmount} or more`
    );

    customRadio.appendChild(createInputRadio);
    customRadio.appendChild(innerRaidioCircle);
    inputLabelContainer.appendChild(customRadio);
    inputLabelContainer.appendChild(createLabel);
    headerContainer.appendChild(inputLabelContainer);
    dollarAmount && headerContainer.appendChild(pledgeAmountHeading);
    cardContainer.appendChild(headerContainer);
    return cardContainer;
  },

  createCardContent(container) {
    const modal = this.createDiv({
      id: "open-modal",
      class: "modal",
    });
    const { modalHeading, modalParagraph } = this.createModalHeaderContent();
    const { closeModalSVG } = this.createCloseModalButton();
    const { noReward } = this.createPledgeNoReward("no-reward");
    const { bamboo } = this.createPledgeBamboo("bamboo-stand");
    const { blackEdition } = this.createPledgeBlackEdition(
      "black-edition-stand"
    );
    const { mahogany } = this.createPledgeMahogany("mahogany-special-stand");

    modal.appendChild(closeModalSVG);
    modal.appendChild(modalHeading);
    modal.appendChild(modalParagraph);
    modal.appendChild(noReward);
    modal.appendChild(bamboo);
    modal.appendChild(blackEdition);
    modal.appendChild(mahogany);

    container.appendChild(modal);
  },

  createSelectReward() {
    const selectRewardBtn = this.createElement(
      "button",
      {
        class: "select-reward-button",
        ["data-select-reward"]: "select-reward",
      },
      "select reward"
    );

    return selectRewardBtn;
  },
};

const modal = {
  init() {
    backedProjectLogic.handleBackProjectClicked(backedProjectLogic.backProjectClicked);
  },
};

modal.init();
