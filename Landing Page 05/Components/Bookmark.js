import { LocalStorage } from "./LocalStorage.js";

const bookmarkLogic = {
  bookmarkClickEvent: document.getElementById("bookmark"),
  storedData: LocalStorage.checkLocalStorageData("bookmarked"),
  bookmarkedCircle: document.querySelector("#bookmark svg circle"),
  bookmarkedPath: document.querySelector("#bookmark svg path"),

  handleBookmarkClicked() {
    bookmarkUI.updateBookmarkClicked(this.storedData);
    this.bookmarkClickEvent.addEventListener("click", () => {
      const checkData = LocalStorage.checkLocalStorageData("bookmarked");
      if (checkData) {
        LocalStorage.removeLocalStorageData("bookmarked");
      } else {
        LocalStorage.updateLocalStorageData("bookmarked", true);
      }
      const updatedData = LocalStorage.checkLocalStorageData("bookmarked");
      bookmarkUI.updateBookmarkClicked(updatedData);
    });
  },
};

const bookmarkUI = {
  updateBookmarkClicked(storedData) {
    if (!storedData) {
      bookmarkLogic.bookmarkedCircle.setAttribute("fill", "#2F2F2F");
      bookmarkLogic.bookmarkedPath.setAttribute("fill", "#B1B1B1");
    } else {
      bookmarkLogic.bookmarkedCircle.setAttribute("fill", "hsl(176, 72%, 28%)");
      bookmarkLogic.bookmarkedPath.setAttribute("fill", "hsl(0, 0%, 98%)");
    }
  }
};

bookmarkLogic.handleBookmarkClicked();
