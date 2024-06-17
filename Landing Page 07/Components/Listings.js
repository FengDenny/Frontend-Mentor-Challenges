import { fetchDataLogic } from "./FetchData";

export const listingsLogic = {
  listings: "./data/data.json",
  async fetchListings() {
    try {
      const listingData = await fetchDataLogic.FetchData(this.listings);
      return listingData;
    } catch (error) {
      console.error(`Error fetching listing data: ${error}`);
    }
  },
  fetchFilteredResult(data, selectedFilters) {
    const filteredData = listingsLogic.filterListingsByCategories(
      data,
      selectedFilters
    );
    return filteredData;
  },

  filterByRoleOrLevelCategory(selectedFilters, jobCategory) {
    if (
      selectedFilters &&
      jobCategory.toLowerCase() !== selectedFilters.toLowerCase()
    ) {
      return false;
    }
    return true;
  },
  filterByLangOrToolCategory(selectedFilters, jobCategory) {
    // Check if selectedFilters is not empty and is an array
    if (selectedFilters && selectedFilters.length) {
      // Map jobCategory to lowercase strings
      const jobItems = jobCategory.map((item) => item.toLowerCase());
      // Check if every selected filter is included in jobItems
      if (
        !selectedFilters.every((filter) =>
          jobItems.includes(filter.toLowerCase())
        )
      ) {
        return false;
      }
    }
    return true;
  },

  filterListingsByCategories(data, selectedFilters) {
    /*
      Role: Frontend, Backend, Fullstack
      Level: Junior, Midweight, Senior
      Languages: Python, Ruby, JavaScript, HTML, CSS
      Tools: React, Sass, Vue, Django, RoR (Ruby on Rails)
      HTML data attributes structure: 
        data-role="frontend" 
        data-level="junior" 
        data-languages="javascript" 
        data-tools="react"   
    */
    // O(n*m)
    return data.filter((job) => {
      // Role
      if (!this.filterByRoleOrLevelCategory(selectedFilters.role, job.role)) {
        return false;
      }
      // Level
      if (!this.filterByRoleOrLevelCategory(selectedFilters.level, job.level)) {
        return false;
      }
      // Languages
      if (
        !this.filterByLangOrToolCategory(
          selectedFilters.languages,
          job.languages
        )
      ) {
        return false;
      }
      // Tools
      if (!this.filterByLangOrToolCategory(selectedFilters.tools, job.tools)) {
        return false;
      }

      return true;
    });
  },

  filterTabletOrdering(job) {
    const filter = []
    filter.push(job.role)
    filter.push(job.level)
  },
};

const initListings = {
  selectedFilters: {
    role: "Backend",
    languages: ["Ruby"],
    tools: ["RoR"]
  },
  data: listingsLogic.fetchListings(),
  async init() {
    console.log("unfiltered data: ", await this.data);
    const filteredResult = listingsLogic.fetchFilteredResult(
      await this.data,
      this.selectedFilters
    );
    console.log("filtered data:" , filteredResult);
  },
};

initListings.init();
