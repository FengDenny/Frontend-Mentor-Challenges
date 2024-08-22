import Modal from "./Modal";
import Buttons from "../Button/Buttons";

function DeleteCommentModal() {
  Modal.call(
    this,
    "Delete Comment",
    "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
  );
}

DeleteCommentModal.prototype = Object.create(Modal.prototype)
DeleteCommentModal.prototype.constructor = DeleteCommentModal

DeleteCommentModal.prototype.createDeleteCommentModal = function(){
    const modal = this.createModal()
    const buttons = new Buttons(true) 

    const cancelButton = buttons.createButtonWithText("No, Cancel", "cancel-btn", "cancel-delete")
    const deleteButton = buttons.createButtonWithText("Yes, Delete", "delete-btn", "continue-delete")

    this.addButton(cancelButton)
    this.addButton(deleteButton)

    return modal
}

export default DeleteCommentModal