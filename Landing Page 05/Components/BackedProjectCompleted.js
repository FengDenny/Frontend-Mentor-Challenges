import {backedProjectModalLogic, backedProjectModalUI } from "./BackedProject";

export const backedProjectModalCompletedLogic = {
  handleContinuePledge(continuePledge, id) {
    continuePledge.addEventListener("click", () => {
      this.updateModal(id);
      this.handleCompletedClick(id)
    });
  },

  handleCompletedClick(id){
    const completeClose = document.getElementById("close-completed")
    const modal = document.getElementById(id);
    completeClose.addEventListener("click", () => {
        modal.classList.add("not-show")
       backedProjectModalLogic.handleModalOnClose()
    })
  },

  updateModal(id) {
    const modal = document.getElementById(id);
    // Clear existing default path on click
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
    const pledgeCompletedContainer = backedProjectModalUI.createDiv({
      class: "pledge-completed-container",
    });

    const thankYouMessage = backedProjectModalUI.createHeadingH2(
      {
        class: "pledge-completed-heading",
      },
      "Thanks for your support!"
    );

    const thankYouDescription = backedProjectModalUI.createParagraph(
      {
        class: "pledge-complete-description",
      },
      `Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. 
    You will get an email once our campaign is completed.`
    );
    const { checkIcon } = backedProjectModalCompletedUI.createCompletedIcon();
    const closeCTA = backedProjectModalCompletedUI.createCompletedCloseCTA()

    pledgeCompletedContainer.append(checkIcon);
    pledgeCompletedContainer.appendChild(thankYouMessage);
    pledgeCompletedContainer.appendChild(thankYouDescription);
    pledgeCompletedContainer.appendChild(closeCTA);


    modal.appendChild(pledgeCompletedContainer);
  },
};

const backedProjectModalCompletedUI = {
  createCompletedIcon() {
    const checkIcon = backedProjectModalUI.createSVGElementNS("svg", {
      class: "check-icon",
      width: "85",
      height: "85",
    });

    const group = backedProjectModalUI.createSVGElementNS("g", {
      fill: "none",
      ["fill-rule"]: "evenodd",
    });

    const circle = backedProjectModalUI.createSVGElementNS("circle", {
      fill: "#3CB3AB",
      cx: "40",
      cy: "40",
      r: "40",
    });

    const path = backedProjectModalUI.createSVGElementNS("path", {
      d: "M26 34.86L35.093 46 55 26",
      stroke: "#FFF",
      ["stroke-width"]: "6",
    });

    group.appendChild(circle);
    group.appendChild(path);
    checkIcon.appendChild(group);

    return { checkIcon };
  },

  createCompletedCloseCTA(){
    const closeCTA = backedProjectModalUI.createCTA({
        id:"close-completed",
        class:"close-completed-modal"
    }, "Got it!")

    return closeCTA
  }
};

// backedProjectModalCompletedLogic.handleCompletedClick()