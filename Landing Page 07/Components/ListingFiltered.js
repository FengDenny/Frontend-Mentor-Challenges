export const listingsFilteredLogic = {
    fetchFilteredResult(data, selectedFilters) {
      const filteredData = this.filterListingsByCategories(
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