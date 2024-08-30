import { editReplies, editComment } from "@api/endpoints/patchEndpoints";
import Buttons from "@components/Button/Buttons";
import {
  postNewReply,
  postNewCommentReply,
} from "@api/endpoints/postEndpoints";
import { renderComments } from "@api/render/renderComments";

// General function to update button state and set up event listener
export async function updateButtonState(
  newAction,
  newTextContent,
  commentTextArea,
  articleElementDataID,
  articleElementDataUsername,
  replyID
) {
  let sendCommentBtn =
    document.querySelector('button[data-action="send-comment"]') ||
    document.querySelector('button[data-action="reply-comment"]') ||
    document.querySelector('button[data-action="edit-reply"]') ||
    document.querySelector('button[data-action="new-comment-reply"]') ||
    document.querySelector('button[data-action="edit-comment"]');

  const cancelEditBtn = document.querySelector(
    '[data-action="cancel-edit-mode"]'
  );

  if (sendCommentBtn.dataset.action !== newAction) {
    sendCommentBtn.dataset.action = newAction;
    sendCommentBtn.textContent = newTextContent;
    sendCommentBtn.style.width = "116px";
    sendCommentBtn.style.fontWeight = "bold";

    if (cancelEditBtn) {
      cancelEditBtn.remove();
    }

    handleCancelButtonClicked(commentTextArea, sendCommentBtn);

    // Ensure handleSendCommentButtonClicked is defined and valid
    if (typeof handleSendCommentButtonClicked === "function") {
      await handleSendCommentButtonClicked(
        sendCommentBtn,
        commentTextArea,
        articleElementDataID,
        articleElementDataUsername,
        replyID
      );
    } else {
      console.error("handleSendCommentButtonClicked is not a function");
    }
  }
}

// Handles sending or editing comments or replies
async function handleSendCommentButtonClicked(
  sendCommentBtn,
  commentTextArea,
  articleElementDataID,
  articleElementDataUsername,
  replyID
) {
  sendCommentBtn.addEventListener("click", async function editHandler(event) {
    event.preventDefault();
    const updatedContent = commentTextArea.value.trim();
    const cancelEditBtn = document.querySelector(
        '[data-action="cancel-edit-mode"]'
      );

    if (updatedContent) {
      try {
        switch (sendCommentBtn.dataset.action) {
          case "edit-reply":
            await editReplies(
              articleElementDataUsername,
              articleElementDataID,
              replyID,
              updatedContent
            );
            break;
          case "new-comment-reply":
            await postNewCommentReply(
              updatedContent,
              articleElementDataUsername,
              articleElementDataID
            );
            break;
          case "edit-comment":
            await editComment(updatedContent, articleElementDataID);
            break;
          default:
            await postNewReply(
              updatedContent,
              articleElementDataUsername,
              articleElementDataID,
              replyID
            );
            break;
        }
        if (cancelEditBtn) {
            cancelEditBtn.remove();
          }
        resetButtonAndTextArea(sendCommentBtn, commentTextArea);
        await renderComments();
      } catch (error) {
        console.error("Error processing comment:", error);
      } finally {
        // Remove the event listener after the edit is done
        sendCommentBtn.removeEventListener("click", editHandler);
      }
    } else {
      console.error("Comment content is empty.");
    }
  });
}

// Resets the button and text area after an action
function resetButtonAndTextArea(sendCommentBtn, commentTextArea) {
  sendCommentBtn.dataset.action = "send-comment";
  sendCommentBtn.textContent = "Send";
  commentTextArea.value = "";
  commentTextArea.placeholder = "Add a comment...";
}

function handleCancelButtonClicked(commentTextArea, sendCommentBtn) {
  const button = new Buttons(true);
  const cancelBtn = button.createButtonWithText(
    "Cancel",
    "cancel-edit",
    "cancel-edit-mode"
  );
  const authWriteBtnContainer = document.querySelector(
    ".auth-write-btn-container"
  );
  authWriteBtnContainer.appendChild(cancelBtn);

  cancelBtn.addEventListener("click", () => {
    resetButtonAndTextArea(sendCommentBtn, commentTextArea);
    cancelBtn.remove();
  });
}
