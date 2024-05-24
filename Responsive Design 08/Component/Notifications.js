
async function notificationData(){
    try{
        const response = await fetch("../data/notifications.json")

        if (!response.ok) {
            throw new Error("Invalid response");
          }

        const notificationsData = await response.json()

        displayNotificationData(notificationsData)

    }catch(error) {
        console.error(`Error retrieving the data: ${error}`)
    }
}

function displayNotificationData(data){
    /* Changing unread to read */
    // data.notifications[0].status = "read";

    const unreadMsg = filterByStatus(data.notifications, "unread")
    const readMsg = filterByStatus(data.notifications, "read")
    


    let currentUnread = unreadMsg.length

    console.log("unread: ", unreadMsg, currentUnread)
    console.log("read: ", readMsg)
    
    const unreadStatus = document.querySelector('#status-unread');
    unreadStatus.textContent = currentUnread


}


function filterByStatus( data, status){
    return data.filter((data) => data.status === `${status}` )
}


notificationData()