import Modal from "./Modal";
import Buttons from "../Button/Buttons";

function DeleteCommentModal(isReplyModal) {
  Modal.call(
    this,
    "Delete comment",
    "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
  );
  this.postID = null;
  this.username = null;
  this.isReplyModal = isReplyModal
  this.orignalID = null
}

DeleteCommentModal.prototype = Object.create(Modal.prototype);
DeleteCommentModal.prototype.constructor = DeleteCommentModal;

DeleteCommentModal.prototype.createDeleteCommentModal = function (
  postID,
  username, 
  orignalID
) {
  this.postID = postID;
  this.username = username;

  if(orignalID){
    this.orignalID = orignalID
  }
  const modal = this.createModal();
  const buttons = new Buttons(true);

  const modalBtnContainer = document.createElement("div");
  modalBtnContainer.className = "modal-btn-container";

  const cancelButton = buttons.createButtonWithText(
    "No, Cancel",
    "cancel-btn",
    "cancel-delete"
  );
  const deleteButton = buttons.createButtonWithText(
    "Yes, Delete",
    "delete-btn",
    "continue-delete"
  );

  const deleteReplyButton = buttons.createButtonWithText(
    "Yes, Delete",
    "delete-btn",
    "continue-reply-delete"
  );
  modalBtnContainer.appendChild(cancelButton);

  if(!this.isReplyModal){
    modalBtnContainer.appendChild(deleteButton);
  }else{
    modalBtnContainer.appendChild(deleteReplyButton)
  }

  this.addButton(modalBtnContainer);

  return modal;
};

export default DeleteCommentModal;
