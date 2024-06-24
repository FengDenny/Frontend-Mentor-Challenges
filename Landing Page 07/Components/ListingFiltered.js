import { LocalStorage } from "../Components/LocalStorage";
export const listingsFilteredLogic = {
  filterByRoleOrLevel(selectedFilters, job) {
    const selectedFiltersMatched = selectedFilters.map((data) =>
      data.toLowerCase()
    );
    const filterMatched = selectedFiltersMatched.includes(job.toLowerCase());
    return filterMatched;
  },

  filterByLangsOrTools(selectedFilters, job) {
    const filterMatched = job.map((data) => data.toLowerCase());
    const selectedFiltersMatched = selectedFilters.map((data) =>
      data.toLowerCase()
    );
    const matched =
      selectedFiltersMatched &&
      selectedFiltersMatched.every((data) =>
        filterMatched.includes(data.toLowerCase())
      );
    return matched;
  },
  filterResult(data, selectedFilters) {
    return data.filter((job) => {
      const roleMatch = this.filterByRoleOrLevel(
        selectedFilters.role,
        job.role
      );
      const languagesMatch = this.filterByLangsOrTools(
        selectedFilters.languages,
        job.languages
      );
      const toolsMatch = this.filterByLangsOrTools(
        selectedFilters.tools,
        job.tools
      );
      const levelMatch = this.filterByRoleOrLevel(
        selectedFilters.level,
        job.level
      );
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

  fetchListingsHTMLDataAndFilter() {
    const listingCards = document.querySelectorAll(
      "article[data-id=listing-card]"
    );

    const activeFilters = {
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
        this.handleFilterOnClick(activeFilters, target);
        LocalStorage.handleInitialLocalStorage("activeFilters", activeFilters);
      });
    });
  },
};
