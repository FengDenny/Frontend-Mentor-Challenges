import { createElementsHelpers } from "./Helpers";
import { LocalStorage } from "./LocalStorage";

export const progressLogic = {
  progressSection: document.getElementById("progress"),
  progressData: [
    {
      id: "total-amount-backed",
      total: "89,914",
      description: "of $100,000 backed",
    },
    { id: "total-backers", total: "5,007", description: "total backers" },
    { id: "days-left", total: "56", description: "days left" },
  ],


  handleProgressData() {
    LocalStorage.handleInitialLocalStorage(this.progressData);
    this.handleUpdateUI()
  },



  handleProgressNumberData() {
    this.progressData.forEach((item) => {
      progressUI.createArticle(item);
    });
  },

  handleUpdateUI() {
    this.progressSection.textContent = "";  // Clear the section
    this.handleProgressNumberData();      // Re-render the numbers
    this.handleProgressBarData();         // Re-render the progress bar
  },
  handleProgressBarData() {
    const totalBacked = LocalStorage.checkLocalStorageData(
      "total-amount-backed"
    );
    if(totalBacked){
      const totalBackedValue = totalBacked.split(",").join("");
      const progressValue = parseInt(totalBackedValue);
      progressUI.createProgressBar(100000, progressValue);
    }
  },
  handleProgressNumberUpdates(totalAmount, totalBacker){
    const totalAmountBacked = LocalStorage.updateLocalStorageData( "total-amount-backed", totalAmount)
    const totalBackers = LocalStorage.updateLocalStorageData("total-backers", totalBacker)
    return {totalAmountBacked, totalBackers}
  },
  handleLocalStorageUpdates(item){
    // key: item.id, value: localStorage value
    const localStorageKeys = {
      "total-amount-backed": "total-amount-backed", 
      "total-backers": "total-backers",
    }
    if(localStorageKeys[item.id]){
      LocalStorage.updateLocalStorageData(localStorageKeys[item.id], item.total)
    }
 
  }


};

const progressUI = {
  createArticle(item) {
    const article = createElementsHelpers.createArticle({ id: item.id });
    const headingText =
      LocalStorage.checkLocalStorageData(item.id) || item.total;


    const heading = createElementsHelpers.createHeadingH2({}, headingText);
    const span = createElementsHelpers.createSpan({}, item.description);

    article.appendChild(heading);
    article.appendChild(span);
    progressLogic.progressSection.appendChild(article);
  },

  createProgressBar(max = 0, value = 0) {
    const progressbar = createElementsHelpers.createProgressbar({
      id: "backed-progress",
      max,
      value,
      ["aria-label"]: "Backed progress",
    });

    progressLogic.progressSection.appendChild(progressbar);
  },
};

progressLogic.handleProgressData();
