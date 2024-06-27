import { LocalStorage } from "../Components/LocalStorage";
import { createElementsHelpers } from "./CreateElementsHelpers";
import { listingsUI } from "./Listings";
export const listingsFilteredLogic = {
  filteredResult: "selectedFilters",
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
      const roleMatch =
        selectedFilters.role.length === 0 ||
        this.filterByRoleOrLevel(selectedFilters.role, job.role);
      const languagesMatch =
        selectedFilters.language.length === 0 ||
        this.filterByLangsOrTools(selectedFilters.language, job.languages);
      const toolsMatch =
        selectedFilters.tool.length === 0 ||
        this.filterByLangsOrTools(selectedFilters.tool, job.tools);
      const levelMatch =
        selectedFilters.level.length === 0 ||
        this.filterByRoleOrLevel(selectedFilters.level, job.level);

      // Return true only if all filters match
      return roleMatch && languagesMatch && toolsMatch && levelMatch;
    });
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

    this.handleFetchAttachEventListeners(data, selectedFilters);
  },

  fetchListingsHTMLDataAndFilter(data) {
    // Initialize selected filters from local storage or defaults
    const selectedFilters = LocalStorage.checkLocalStorageData(
      this.filteredResult
    ) || {
      role: [],
      level: [],
      language: [],
      tool: [],
    };
    this.filterAndLog(data, selectedFilters);
    this.handleFetchedRemoveResult();
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
          this.filteredResult,
          selectedFilters
        );

        this.filterAndLog(data, selectedFilters);
        this.handleFetchedRemoveResult(data, selectedFilters);
      });
    });
  },
  handleFetchedRemoveResult(data) {
    const filterResultDiv = document.getElementById("filter-result");
    console.log(filterResultDiv);
    const getFilteredResult = LocalStorage.checkLocalStorageData(
      this.filteredResult
    );

    // // Clear existing filter results using hasChildNodes and removeChild
    while (filterResultDiv.hasChildNodes()) {
      filterResultDiv.removeChild(filterResultDiv.firstChild);
    }

    const removeBtnDiv = createElementsHelpers.createDiv({
      class: "remove-btn-container",
    });

    const clearAllFilters = createElementsHelpers.createCTA(
      {
        class: "clear-all-filters",
        id: "clear-filters",
      },
      "Clear"
    );

    if (getFilteredResult) {
      const {role, level, language, tool } = getFilteredResult;
      if (
        role.length !== 0 ||
        level.length !== 0 ||
        language.length !== 0 ||
        tool.length !== 0
      ) {
        role.forEach((role) => {
          const roledRemoveCTA = createElementsHelpers.createCTA(
            {
              class: "remove-filter",
              ["data-role"]: role,
            },
            role
          );
          removeBtnDiv.appendChild(roledRemoveCTA);
        });
        level.forEach((level) => {
          const leveledRemoveCTA = createElementsHelpers.createCTA(
            {
              class: "remove-filter",
              ["data-level"]: level,
            },
            level
          );
          removeBtnDiv.appendChild(leveledRemoveCTA);
        });
        language.forEach((language) => {
          const languagedRemoveCTA = createElementsHelpers.createCTA(
            {
              class: "remove-filter",
              ["data-language"]: language,
            },
            language
          );
          removeBtnDiv.appendChild(languagedRemoveCTA);
        });

        tool.forEach((tool) => {
          const toolsRemoveCTA = createElementsHelpers.createCTA(
            {
              class: "remove-filter",
              ["data-tool"]: tool,
            },
            tool
          );
          removeBtnDiv.appendChild(toolsRemoveCTA);
        });

        filterResultDiv.appendChild(removeBtnDiv);
        filterResultDiv.appendChild(clearAllFilters);
        filterResultDiv.classList.add("show");
        filterResultDiv.classList.remove("not-show");
        this.handleFilterRemoval(data)

        const clearBtn = document.getElementById("clear-filters");
        clearBtn.addEventListener("click", () => {
           // Reset selected filters
           const defaultFilters = {
            role: [],
            level: [],
            language: [],
            tool: [],
          };
          LocalStorage.handleInitialLocalStorage(this.filteredResult, defaultFilters);
          this.handleFetchedRemoveResult(data, defaultFilters);
          this.filterAndLog(data, defaultFilters);
          filterResultDiv.classList.remove("show");
        filterResultDiv.classList.add("not-show");
        });
      } else {
        filterResultDiv.classList.remove("show");
        filterResultDiv.classList.add("not-show");
      }
    }
  },
  handleFilterRemoval(data) {
    const filterResultDiv = document.getElementById("filter-result");
    // Attach event listener to the parent div (filterResultDiv)
    filterResultDiv.addEventListener('click', (event) => {
      if (event.target.matches('button.remove-filter')) {
        const { role, level, language, tool } = event.target.dataset;
        const selectedFilters = LocalStorage.checkLocalStorageData(this.filteredResult) || {
          role: [],
          level: [],
          language: [],
          tool: [],
        };
  
        if (role) {
          const index = selectedFilters.role.indexOf(role);
          if (index > -1) selectedFilters.role.splice(index, 1);
        } else if (level) {
          const index = selectedFilters.level.indexOf(level);
          if (index > -1) selectedFilters.level.splice(index, 1);
        } else if (language) {
          const index = selectedFilters.language.indexOf(language);
          if (index > -1) selectedFilters.language.splice(index, 1);
        } else if (tool) {
          const index = selectedFilters.tool.indexOf(tool);
          if (index > -1) selectedFilters.tool.splice(index, 1);
        }
  
        LocalStorage.handleInitialLocalStorage(this.filteredResult, selectedFilters);
        this.handleFetchedRemoveResult(data, selectedFilters);
        this.filterAndLog(data, selectedFilters);
      }
    });
  }
  
};
