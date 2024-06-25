import { LocalStorage } from "../Components/LocalStorage";
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
    Check if selectedFilters is defined. 
    If not, we return true, meaning the filter condition is considered met. 
    This ensures that if a filter isn't provided, it doesn't affect the filtering process, which can cause "undefined" error.
    */
    return data.filter((job) => {
      const roleMatch = selectedFilters.role
        ? this.filterByRoleOrLevel(selectedFilters.role, job.role)
        : true;
      const languagesMatch = selectedFilters.languages
        ? this.filterByLangsOrTools(selectedFilters.languages, job.languages)
        : true;
      const toolsMatch = selectedFilters.tools
        ? this.filterByLangsOrTools(selectedFilters.tools, job.tools)
        : true;
      const levelMatch = selectedFilters.level
        ? this.filterByRoleOrLevel(selectedFilters.level, job.level)
        : true;

      // Return true only if all filters match
      return roleMatch && languagesMatch && levelMatch && toolsMatch;
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
  filterAndLog(data, selectedFilters){
    const filteredData = this.filterResult(data, selectedFilters);
    console.log(filteredData);
  },

  fetchListingsHTMLDataAndFilter(data) {
    const listingCards = document.querySelectorAll(
      "article[data-id=listing-card]"
    );

      // Initialize selected filters from local storage or defaults
  const selectedFilters = LocalStorage.checkLocalStorageData("selectedFilters") || {
    role: [],
    level: [],
    languages: [],
    tools: [],
  };

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

        this.filterAndLog(data, selectedFilters)
      });
    });
    this.filterAndLog(data, selectedFilters)
  },
};
