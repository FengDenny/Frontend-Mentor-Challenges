import { postNewComment } from "../../API/endpoints/postEndpoints";
import { editComment } from "../../API/endpoints/patchEndpoints";
import { renderComments } from "../../API/render/renderComments";
const writeComment = document.getElementById("auth-write");

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

async function handleSendButtonEditChanges(
  commentTextArea,
  articleElementDataID
) {
  const sendCommentBtn = document.getElementById("send-comment");
  sendCommentBtn.id = "edit-comment";
  sendCommentBtn.textContent = "Edit Comment";
  sendCommentBtn.style.width = "116px";
  sendCommentBtn.style.fontWeight ="bold"

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

// Attach a single event listener to the body for event delegation
writeComment.addEventListener("click", handleSendButtonClicked);

export { handleSendButtonEditChanges };
