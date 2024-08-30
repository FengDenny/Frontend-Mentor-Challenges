import { editReplies, editComment } from "@api/endpoints/patchEndpoints";
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
    document.querySelector('button[data-action="new-comment-reply"]');

  if (sendCommentBtn.dataset.action !== newAction) {
    sendCommentBtn.dataset.action = newAction;
    sendCommentBtn.textContent = newTextContent;
    sendCommentBtn.style.width = "116px";
    sendCommentBtn.style.fontWeight = "bold";

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
  
      if (updatedContent) {
        try {
          switch (sendCommentBtn.dataset.action) {
            case "edit-reply":
              await editReplies(articleElementDataUsername, articleElementDataID, replyID, updatedContent);
              break;
            case "new-comment-reply":
              await postNewCommentReply(updatedContent, articleElementDataUsername, articleElementDataID);
              break;
            case "edit-comment":
              await editComment(updatedContent, articleElementDataID);
              break;
            default:
              await postNewReply(updatedContent, articleElementDataUsername, articleElementDataID, replyID);
              break;
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
  