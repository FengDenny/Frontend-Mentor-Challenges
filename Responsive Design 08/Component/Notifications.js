// Logic Module (encapsulates data handling and processing)
const notificationsLogic = {
  currentUnread: 0,
  readMsg: null,
  unreadMsg: null,

  async fetchNotificationData() {
    try {
      const response = await fetch("../data/notifications.json");

      if (!response.ok) {
        throw new Error("Invalid response");
      }
      const notificationsData = await response.json();
      this.displayNotificationData(notificationsData);
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

    /* Changing unread to read */
    // data.notifications[0].status = "read";
  },
  markAllMsgAsRead(data) {
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

      console.log(this.unreadMsg, this.readMsg);
    });
  },
  filterByStatus(data, status) {
    return data.filter((data) => data.status === `${status}`);
  },
  updateUnreadStatus(currentUnread){
    notificationsUI.updateUnreadStatus(currentUnread)
  }
};

// Presentation Module (encapsulates HTML content manipulation)
const notificationsUI = {
  updateUnreadStatus(currentUnread) {
    const unreadStatus = document.querySelector("#status-unread");
    unreadStatus.textContent = currentUnread;
  },
};

// Init 

const notificationApp = {
    init(){
        notificationsLogic.fetchNotificationData()
    }
}

notificationApp.init()