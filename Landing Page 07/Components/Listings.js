import { fetchDataLogic } from "./FetchData";

export const listingsLogic = {
  listings: "./data/data.json",
  async fetchListings() {
    try {
      const listingData = await fetchDataLogic.FetchData(this.listings);
      console.log(listingData);
    } catch (error) {
      console.error(`Error fetching listing data: ${error}`);
    }
  },
};

const initListings = {
  init() {
    listingsLogic.fetchListings();
  },
};

initListings.init();
