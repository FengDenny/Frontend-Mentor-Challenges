// FETCH JSON DATA
export const fetchDataLogic = {
  async FetchData(file) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Something was wrong fetching ${file} data`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`Failed to fetch ${file} data:`, err);
      throw err;
    }
  },
};
