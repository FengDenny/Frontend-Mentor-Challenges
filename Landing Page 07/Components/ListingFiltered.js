import { LocalStorage } from "../Components/LocalStorage";
import { listingsUI } from "./Listings";
export const listingsFilteredLogic = {
  filterByRoleOrLevel(selectedFilters, job) {
    // If no filters are provided, consider it a match
    if (!selectedFilters || selectedFilters.length === 0) return true;
    const selectedFiltersMatched = selectedFilters.map((data) =>
      data.toLowerCase()
    );
    const filterMatched = selectedFiltersMatched.includes(job.toLowerCase());
    return filterMatched;
  },

  filterByLangsOrTools(selectedFilters, job) {
    // If no filters are provided, consider it a match
    if (!selectedFilters || selectedFilters.length === 0) return true;
    const filterMatched = job.map((data) => data.toLowerCase());
    const selectedFiltersMatched = selectedFilters.map((data) =>
      data.toLowerCase()
    );
    const matched = selectedFiltersMatched.every((data) =>
      filterMatched.includes(data.toLowerCase())
    );
    return matched;
  },
  filterResult(data, selectedFilters) {
    /*
    Check if selectedFilters array length . 
    If empty, we return true, meaning the filter condition is considered met. 
      - This ensures that if a filter isn't provided, it doesn't affect the filtering process, which can cause "undefined" error.
    Otherwise, if have item we filter
    */
    return data.filter((job) => {
      const roleMatch = selectedFilters.role.length === 0 || this.filterByRoleOrLevel(selectedFilters.role, job.role);
      const languagesMatch = selectedFilters.language.length === 0 || this.filterByLangsOrTools(selectedFilters.language, job.languages);
      const toolsMatch = selectedFilters.tool.length === 0 || this.filterByLangsOrTools(selectedFilters.tool, job.tools);
      const levelMatch = selectedFilters.level.length === 0 || this.filterByRoleOrLevel(selectedFilters.level, job.level);

      // Return true only if all filters match
      return roleMatch && languagesMatch && toolsMatch && levelMatch;

     
    });
  },

  filterTabletOrdering(job) {
    const filter = [];
    filter.push(job.role);
    filter.push(job.level);
  },

  handleFilterOnClick(activeFilters, target) {
    if (target.matches("button")) {
      for (const key in target.dataset) {
        if (target.dataset.hasOwnProperty(key)) {
          const value = target.dataset[key];
          if (!activeFilters[key].includes(value)) {
            activeFilters[key].push(value);
          }
        }
      }
    }
  },
  filterAndLog(data, selectedFilters) {
    const filteredData = this.filterResult(data, selectedFilters);
    console.log(filteredData);

    // // Clear existing listings using hasChildNodes and removeChild
    while (listingsUI.main.hasChildNodes()) {
      listingsUI.main.removeChild(listingsUI.main.firstChild);
    }

    filteredData.forEach((job) => {
      if (job.featured === true && job.new === true) {
        listingsUI.createListingCards(job);
      } else if (job.new === true) {
        listingsUI.createListingCards(job);
      } else {
        listingsUI.createListingCards(job);
      }
    });

    this.handleFetchAttachEventListeners(data, selectedFilters)
  },

  handleFetchAttachEventListeners(data, selectedFilters) {
    const listingCards = document.querySelectorAll(
      "article[data-id=listing-card]"
    );

    listingCards.forEach((listingCard) => {
      const filtersContainer = listingCard.querySelector(
        '[data-filters="listings-filters"]'
      );
      filtersContainer.addEventListener("click", (event) => {
        const target = event.target;
        this.handleFilterOnClick(selectedFilters, target);
        LocalStorage.handleInitialLocalStorage(
          "selectedFilters",
          selectedFilters
        );

        this.filterAndLog(data, selectedFilters);
      });
    });
  },


  fetchListingsHTMLDataAndFilter(data) {
    // Initialize selected filters from local storage or defaults
    const selectedFilters = LocalStorage.checkLocalStorageData(
      "selectedFilters"
    ) || {
      role: [],
      level: [],
      language: [],
      tool: [],
    };
    this.filterAndLog(data, selectedFilters);
  },
};
