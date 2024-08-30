import { postNewComment } from "@api/endpoints/postEndpoints";
import { renderComments } from "@api/render/renderComments";

const writeComment = document.getElementById("auth-write");


async function handleSendButtonClicked(event) {
  const target = event.target;

  if (target.matches('[data-action="send-comment"]')) {
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


// Attach a single event listener to the body for event delegation
writeComment.addEventListener("click", handleSendButtonClicked);


