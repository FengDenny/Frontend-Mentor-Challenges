import { backedProjectLogic, backedProjectUI } from "./BackedProject";

const aboutProjectLogic = {
  aboutProjectSection: document.getElementById("project-about"),

  handleBackedCards() {
    const { bamboo } = backedProjectUI.createPledgeBamboo(
      "bamboo-select",
      this.aboutProjectSection.id
    );
    const { blackEdition } = backedProjectUI.createPledgeBlackEdition(
      "black-edition-select",
      this.aboutProjectSection.id
    );
    const { mahogany } = backedProjectUI.createPledgeMahogany(
      "mahogany-special-select",
      this.aboutProjectSection.id
    );

    this.aboutProjectSection.appendChild(bamboo);
    this.aboutProjectSection.appendChild(blackEdition);
    this.aboutProjectSection.appendChild(mahogany);
    backedProjectLogic.handlePledgeClicked(".card-container[data-container]");
    backedProjectLogic.handlePledgeLeft("div[data-container]");
  },
};

const aboutProjectUI = {};

aboutProjectLogic.handleBackedCards();
