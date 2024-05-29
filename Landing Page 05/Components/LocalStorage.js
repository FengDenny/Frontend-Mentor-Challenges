export const LocalStorage = {
  
    checkLocalStorageData(key) {
    return localStorage.getItem(key);
  },

  updateLocalStorageData(key, value) {
    if (typeof value === "object" && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
      console.log(`Updated ${key} in localStorage:`, localStorage.getItem(key));
    }
  },

  removeLocalStorageData(key){
    localStorage.removeItem(key)
    console.log(`Removed ${key} from localStorage`);
  }
};
