import { fetchDataLogic } from "./FetchData";
import { listingsFilteredLogic } from "./ListingFiltered";

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
  async fetchListingDataModified(){
    const listingData = await this.fetchListings()

    const modified = listingData.map((item) => {
      // Check if location is "USA / UK  Only", then modify to "USA / UK only"
      if(item.location.includes('Only')) {
        item.location = item.location.replace("Only", "only")
      }
      return item
    })
    return modified
  }
};

const initListings = {
  selectedFilters: {
    role: "Backend",
    languages: ["Ruby"],
    tools: ["RoR"]
  },
  data: listingsLogic.fetchListingDataModified(),
  async init() {
    const dataModified = await this.data
    console.log("Data modified: ", dataModified)
    const filteredResult = listingsFilteredLogic.fetchFilteredResult(
      dataModified,
      this.selectedFilters
    );
    console.log("filtered data:" , filteredResult);
  },
};

initListings.init();
