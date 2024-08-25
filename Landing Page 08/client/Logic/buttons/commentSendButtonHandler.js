import { postNewComment } from "../../API/endpoints/postEndpoints";
import { editComment } from "../../API/endpoints/patchEndpoints";
import { renderComments } from "../../API/render/renderComments";
import Buttons from "../../Components/Button/Buttons";

const writeComment = document.getElementById("auth-write");

function handleCancelButtonClicked(commentTextArea, sendCommentBtn){
  const authCommentContainer = writeComment.querySelector(".auth-comment-container")
  console.log(authCommentContainer)

  const button = new Buttons(true)
  const cancelBtn = button.createButtonWithText("Cancel", "cancel-edit", "cancel-edit-mode")
  const authWriteBtnContainer = document.querySelector(".auth-write-btn-container")
  authWriteBtnContainer.appendChild(cancelBtn)
  let cancelEditBtn = document.getElementById("cancel-edit-mode");
  const cancelEdit = () => {
    // Reset the textarea and button states
    commentTextArea.value = "";
    commentTextArea.placeholder = "Add a comment...";
    sendCommentBtn.id = "send-comment";
    sendCommentBtn.textContent = "Send";
    sendCommentBtn.style.fontWeight = "normal";

    // Remove the "Cancel Edit" button
    cancelEditBtn.remove();
  };

  cancelEditBtn.addEventListener("click", cancelEdit)
}

function handleSendCommentButtonClicked(sendCommentBtn, commentTextArea){
  sendCommentBtn.addEventListener("click", async function editHandler(event) {
    event.preventDefault();
    const updatedContent = commentTextArea.value.trim();

    if (updatedContent) {
      try {
        await editComment(updatedContent, articleElementDataID);
        sendCommentBtn.id = "send-comment";
        sendCommentBtn.textContent = "Send";
        commentTextArea.value = "";
        commentTextArea.placeholder = "Add a comment...";

        await renderComments();
      } catch (error) {
        console.error("Error editing comment:", error);
      } finally {
        // Remove the event listener after the edit is done
        sendCommentBtn.removeEventListener("click", editHandler);
      }
    } else {
      console.error("Comment content is empty.");
    }
  });
}

async function handleSendButtonClicked(event) {
  const target = event.target;

  if (target.matches("#send-comment")) {
    event.preventDefault();
    const commentTextArea = document.getElementById("add-comment");
    const commentContent = commentTextArea.value.trim();

    if (commentContent) {
      try {
        await postNewComment(commentContent);
        commentTextArea.value = "";
        await renderComments();
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    } else {
      console.error("Comment content is empty.");
    }
  }
}

async function handleSendButtonEditChanges(commentTextArea, articleElementDataID) {
  let sendCommentBtn = document.getElementById("send-comment") || document.getElementById("edit-comment");

  if (sendCommentBtn.id !== "edit-comment") {
    sendCommentBtn.id = "edit-comment";
    sendCommentBtn.textContent = "Edit Comment";
    sendCommentBtn.style.width = "116px";
    sendCommentBtn.style.fontWeight = "bold";

    handleCancelButtonClicked(commentTextArea, sendCommentBtn)

    handleSendCommentButtonClicked(sendCommentBtn, commentTextArea)
  }
}

const comment = document.getElementById("comment");

async function handleEditButtonClicked(event) {
  const target = event.target;

  if (target.matches("#edit-comment")) {
    event.preventDefault();

    const articleElement = target.closest("article");
    if (!articleElement) return;

    const articleElementDataID = articleElement.dataset.id;
    const articleElementDataUsername = articleElement.dataset.username;

    const commentParagraph = document.querySelector(
      `.comment-p[data-id="${articleElementDataUsername}-${articleElementDataID}-comment"]`
    );

    if (commentParagraph) {
      const commentTextArea = document.getElementById("add-comment");
      const currentComment = commentParagraph.textContent.trim();

      commentTextArea.placeholder = "Edit comment....";
      commentTextArea.value = currentComment;
      commentTextArea.focus();

      await handleSendButtonEditChanges(commentTextArea, articleElementDataID);
    }
  }
}

// Attach a single event listener to the body for event delegation
comment.addEventListener("click", handleEditButtonClicked);
writeComment.addEventListener("click", handleSendButtonClicked);

export { handleSendButtonEditChanges };
