// FETCH JSON DATA
export const fetchDataLogic = {
  async FetchData(file) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error("Something was wrong fetching the json data");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("There has been a problem with your fetch operation:", err);
      throw err;
    }
  },
};
