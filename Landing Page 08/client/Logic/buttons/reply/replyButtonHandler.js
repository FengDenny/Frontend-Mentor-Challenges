import { postNewReply } from "@api/endpoints/postEndpoints";
import { renderComments } from "@api/render/renderComments";


function handleSendCommentButtonClicked(sendCommentBtn, commentTextArea, articleElementDataID, articleElementDataUsername, replyID){
  sendCommentBtn.addEventListener("click", async function editHandler(event) {
    event.preventDefault();
    const updatedContent = commentTextArea.value.trim();

    if (updatedContent) {
      try {

        await postNewReply(updatedContent, articleElementDataUsername, articleElementDataID, replyID);
        sendCommentBtn.dataset.action  = "send-comment";
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


async function handleSendButtonEditChanges(commentTextArea, articleElementDataID, articleElementDataUsername, replyID) {
  let sendCommentBtn = document.querySelector('button[data-action="send-comment"]') || document.querySelector('button[data-action="reply-comment"]') || document.querySelector('button[data-action="edit-reply"]');

  console.log(sendCommentBtn)


  if (sendCommentBtn.dataset.action !== "reply-comment") {
    sendCommentBtn.dataset.action = "reply-comment";
    sendCommentBtn.textContent = "Reply";
    sendCommentBtn.style.width = "116px";
    sendCommentBtn.style.fontWeight = "bold";
    handleSendCommentButtonClicked(sendCommentBtn, commentTextArea, articleElementDataID, articleElementDataUsername, replyID)
  }
}

const comment = document.getElementById("comment");

async function handleReplyButtonClicked(event) {
  const target = event.target;
  const replyButton = event.target.closest('.reply-btn');

  if (target.matches(".reply-btn") && replyButton.hasAttribute('data-id')) {
    event.preventDefault();
    const articleElement = target.closest("article");
    if (!articleElement) return;

    // // Retrieve the article's unique ID and username
    const articleElementDataID = articleElement.dataset.original;
    const articleElementDataUsername = articleElement.dataset.originalUsername;
    const replyID = articleElement.dataset.id;

    console.log(articleElementDataID, articleElementDataUsername, replyID)

    const commentTextArea = document.getElementById("add-comment");
    const reply = commentTextArea.textContent.trim();

    commentTextArea.placeholder = "Add a reply...";
    commentTextArea.value = reply;
    commentTextArea.focus();

    await handleSendButtonEditChanges(commentTextArea, articleElementDataID, articleElementDataUsername, replyID);
  }
}

// Attach a single event listener to the body for event delegation
comment.addEventListener("click", handleReplyButtonClicked);