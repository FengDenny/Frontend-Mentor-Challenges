import DeleteCommentModal from "../../Components/Modal/DeleteCommentModal";

/*
Perform event delegation (bubbling up) 

Attaching a single event listener to a common ancestor (parent element)
This listener will handle events that bubble up from its child elements

Use event.target to determine which specific child element triggered the event. 
Then use event.target.matches(selector) or similar checks to identify 
and respond to the event on that specific element.
*/

let currentModal = null;

function handleButtonClicked(event) {
  const target = event.target;

  // Handle opening the delete modal
  if (target.matches("#delete-modal-open")) {
    const existingModal = document.getElementById("modal");
    if (!existingModal) {
      const deleteCommentModal = new DeleteCommentModal();
      const modalElement = deleteCommentModal.createDeleteCommentModal();
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
}

// Attach a single event listener to the body for event delegation
document.body.addEventListener("click", handleButtonClicked);
