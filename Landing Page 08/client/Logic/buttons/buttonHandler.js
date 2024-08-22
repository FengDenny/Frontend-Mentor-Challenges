import DeleteCommentModal from "../../Components/Modal/DeleteCommentModal";
import {deleteAuthUserComment} from "../../API/endpoints/deleteEndpoints";

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
  if (target.matches("#delete-modal-open")) {
    const cardElement = target.closest(".card");
    if (cardElement) {
      const postID = cardElement.dataset.id;
      const username = cardElement.dataset.username;
      const deleteCommentModal = new DeleteCommentModal();
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
  if (target.matches("#cancel-delete")) {
    if (currentModal) {
      currentModal.close();
      currentModal = null;
    }
  }

  if (target.matches("#continue-delete")) {
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
}

// Attach a single event listener to the body for event delegation
document.body.addEventListener("click", handleButtonClicked);
