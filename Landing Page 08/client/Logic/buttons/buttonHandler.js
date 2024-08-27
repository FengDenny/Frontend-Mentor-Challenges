import DeleteCommentModal from "../../Components/Modal/DeleteCommentModal";
import {deleteAuthUserComment , deleteAuthUserReply} from "../../API/endpoints/deleteEndpoints";

/*
Perform event delegation (bubbling up) 

Attaching a single event listener to a common ancestor (parent element)
This listener will handle events that bubble up from its child elements

Use event.target to determine which specific child element triggered the event. 
Then use event.target.matches(selector) or similar checks to identify 
and respond to the event on that specific element.
*/

let currentModal = null;

async function handleButtonClicked(event) {
  const target = event.target;

  // Handle opening the delete modal
  if (target.matches('[data-action="delete-modal-open"]')) {
    const cardElement = target.closest(".card");
    if (cardElement) {
      const postID = cardElement.dataset.id;
      const username = cardElement.dataset.username;
      const deleteCommentModal = new DeleteCommentModal(false);
      const modalElement = deleteCommentModal.createDeleteCommentModal(
        postID,
        username
      );
      document.body.appendChild(modalElement);
      deleteCommentModal.open();
      currentModal = deleteCommentModal;
    }
  }

  // Handle cancel button click inside the modal
  if (target.matches('[data-action="cancel-delete"]')) {
    if (currentModal) {
      currentModal.close();
      currentModal = null;
    }
  }

  if (target.matches('[data-action="continue-delete"]')) {
    if (currentModal) {
      const deletePostID = currentModal.postID;
      try {
        await deleteAuthUserComment(deletePostID);
        const postElement = document.querySelector(`.card[data-id="${deletePostID}"]`);
        if (postElement) {
          postElement.remove();
        }
        if (currentModal) {
          currentModal.close();
          currentModal = null;
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  }

  if(target.matches('[data-reply-action="delete-modal-reply-open"]')){
    const cardElement = target.closest(".card");
    if (cardElement) {
      const postID = cardElement.dataset.id;
      const originalID = cardElement.dataset.original;
      const originalUsername = cardElement.dataset.originalUsername;
      const deleteCommentModal = new DeleteCommentModal(true);
      const modalElement = deleteCommentModal.createDeleteCommentModal(
        postID,
        originalUsername,
        originalID
      );
      document.body.appendChild(modalElement);
      deleteCommentModal.open();
      currentModal = deleteCommentModal;
    }
  }
  
  if(target.matches('[data-action="continue-reply-delete"]')){
    if (currentModal) {
      const postID = currentModal.postID;
      const originalUsername = currentModal.username
      const originalID = currentModal.orignalID
      try {
        await deleteAuthUserReply(originalUsername, originalID,postID);
        const postElement = document.querySelector(`.card[data-id="${postID}"]`);
        if (postElement) {
          postElement.remove();
        }
        if (currentModal) {
          currentModal.close();
          currentModal = null;
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  }

}

// Attach a single event listener to the body for event delegation
document.body.addEventListener("click", handleButtonClicked);
