export const LocalStorage = {
  
    checkLocalStorageData(key) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
  },

  updateLocalStorageData(key, value) {
    if (typeof value === "object" && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
      // console.log(`Updated ${key} in localStorage:`, localStorage.getItem(key));
    }
  },

  removeLocalStorageData(key){
    if (typeof value === "object" && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, value);
      // console.log(`Updated ${key} in localStorage:`, localStorage.getItem(key));
    }
    console.log(`Removed ${key} from localStorage`);
  }, 

  handleInitialLocalStorage(key,data) {
      if (!this.checkLocalStorageData(data)) {
        this.updateLocalStorageData(key, data);
      }
  },
};
 