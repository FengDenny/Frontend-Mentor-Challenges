// Logic Module (encapsulates data handling and processing)
const notificationsLogic = {
  currentUnread: 0,
  readMsg: null,
  unreadMsg: null,

  async fetchNotificationData() {
    try {
      const localDataKey = "notificationsData";
      const storedData = this.checkLocalData(localDataKey);
      if (storedData) {
        const notificationsData = JSON.parse(storedData);
        this.displayNotificationData(notificationsData);
      } else {
        const response = await fetch("../data/notifications.json");
        if (!response.ok) {
          throw new Error("Invalid response");
        }
        const notificationsData = await response.json();

        this.updateLocalData(localDataKey, notificationsData);

        this.displayNotificationData(notificationsData);
      }
    } catch (error) {
      console.error(`Error retrieving the data: ${error}`);
    }
  },
  displayNotificationData(data) {
    this.readMsg = this.filterByStatus(data.notifications, "read");
    this.unreadMsg = this.filterByStatus(data.notifications, "unread");
    this.currentUnread = this.unreadMsg.length;
    console.log("before marked unread: ", this.unreadMsg, this.currentUnread);
    console.log("before marked read: ", this.readMsg);
    this.updateUnreadStatus(this.currentUnread);
    this.markAllMsgAsRead(data.notifications);

    const main = document.getElementById("notifications");

    data.notifications.forEach((notification, index) => {
      const { action, avatar, name, post, group, status, time, privateMsg } =
        notification;
      const article = notificationsUI.createElement("article", {
        class: "notification-content",
        ["data-status"]: status,
      });
      const figure = notificationsUI.createElement("figure");
      const img = notificationsUI.createElement("img", {
        src: `./assets/images/${avatar}`,
        alt: name,
      });
      const divContainer = notificationsUI.createElement("div", {
        class: "notification-content-container",
      });

      const spanActionElement = notificationsUI.createElement(
        "span",
        { class: "notification-action", ["data-action"]: action },
        action
      );
      const spanUnreadElement = notificationsUI.createElement("span", {
        ["data-status"]: status,
      });

      const spanMsgElement = notificationsUI.createElement(
        "span",
        { class: "notification-message", ["data-message"]: true },
        privateMsg
      );

      const spanNotificationItemElement = group
        ? notificationsUI.createElement(
            "span",
            { class: "notification-item", ["data-group"]: group },
            group
          )
        : notificationsUI.createElement(
            "span",
            { class: "notification-item", ["data-post"]: post },
            post
          );

      const h2 = notificationsUI.createElement("h2", {}, `${name} `);
      const timeElement = notificationsUI.createElement(
        "time",
        { ["data-time"]: time },
        time
      );

      main.appendChild(article);
      article.appendChild(figure);
      article.appendChild(divContainer);
      figure.appendChild(img);
      divContainer.appendChild(h2);
      divContainer.appendChild(timeElement);
      privateMsg && divContainer.appendChild(spanMsgElement)
      h2.appendChild(spanActionElement)
        .appendChild(spanNotificationItemElement)
        .appendChild(spanUnreadElement);
    });
  },
  markAllMsgAsRead(data) {
    const localDataKey = "notificationsData";
    const markBtn = document.getElementById("mark-read");
    markBtn.addEventListener("click", () => {
      data.forEach((messages, _) => {
        if (messages.status === "unread") {
          messages.status = "read";
          console.log(messages);
        }
      });
      this.unreadMsg = this.filterByStatus(data, "updated unread");
      this.readMsg = this.filterByStatus(data, "updated read");
      this.currentUnread = this.unreadMsg.length;
      this.updateUnreadStatus(this.currentUnread);

      const notificationsData = { notifications: data };
      this.updateLocalData(localDataKey, notificationsData);

      notificationsData.notifications.forEach((element) => {
        notificationsUI.updateUnreadClass(element.status)
        
      })

      console.log(this.unreadMsg, this.readMsg);
    });
  },
  filterByStatus(data, status) {
    return data.filter((data) => data.status === `${status}`);
  },
  updateUnreadStatus(currentUnread) {
    notificationsUI.updateUnreadStatus(currentUnread);
  },
  checkLocalData(key) {
    return localStorage.getItem(key);
  },
  updateLocalData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

// Presentation Module (encapsulates HTML content manipulation)
const notificationsUI = {
  updateUnreadStatus(currentUnread) {
    const unreadStatus = document.querySelector("#status-unread");
    unreadStatus.textContent = currentUnread;
  },
  updateUnreadClass(status){
    const article  = document.querySelectorAll('article[data-status="unread"]')
    article.forEach((element, index) => {
      const redDot = element.querySelector('span[data-status="unread"]')
      element.setAttribute("data-status", status)
      redDot.setAttribute("data-status", status)
    })
  },


  createElement(tagName, attributes = {}, textContent = "") {
    const element = document.createElement(tagName);
    Object.keys(attributes).forEach((attribute) => {
      element.setAttribute(attribute, attributes[attribute]);
    });
    element.textContent = textContent;
    return element;
  },
};

// Init

const notificationApp = {
  init() {
    notificationsLogic.fetchNotificationData();
  },
};

notificationApp.init();
