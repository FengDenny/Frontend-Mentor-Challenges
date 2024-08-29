import { editReplies } from "@api/endpoints/patchEndpoints";
import { renderComments } from "@api/render/renderComments";

const comment = document.getElementById("comment");

async function handleReplyEditButtonClicked(event) {
  const target = event.target;

  if (target.matches('[data-reply-action="edit-reply"]')) {
    event.preventDefault();

    const articleElement = target.closest("article");
    if (!articleElement) return;

    // Retrieve the article's orignal posters / repliers ID , username
    const articleElementDataID = articleElement.dataset.original;
    const articleElementDataUsername = articleElement.dataset.originalUsername;
    const articleElementRepliersID = articleElement.dataset.id;
    const articleElementRepliersUsername = articleElement.dataset.username;

    const commentParagraph = document.querySelector(
      `.comment-p[data-id="${articleElementRepliersUsername}-${articleElementRepliersID}-comment"]`
    );

    console.log(commentParagraph)

    console.log(
      articleElementDataID,
      articleElementDataUsername,
      articleElementRepliersID
    );

    if (commentParagraph) {
      const spanElement = commentParagraph.querySelector(".replying-to");
      if(spanElement) {
        spanElement.remove()
      }
      const commentTextArea = document.getElementById("add-comment");
      const currentComment = commentParagraph.textContent.trim();
      commentTextArea.placeholder = "Edit comment....";
      commentTextArea.value = currentComment
      commentTextArea.focus();

      await handleSendButtonEditChanges(
        commentTextArea,
        articleElementDataID,
        articleElementDataUsername,
        articleElementRepliersID
      );
    }
  }
}

function handleSendCommentButtonClicked(
  sendCommentBtn,
  commentTextArea,
  articleElementDataID,
  articleElementDataUsername,
  articleElementRepliersID
) {
  sendCommentBtn.addEventListener("click", async function editHandler(event) {
    event.preventDefault();
    const updatedContent = commentTextArea.value.trim();

    if (updatedContent) {
      try {
        await editReplies(
          articleElementDataUsername,
          articleElementDataID,
          articleElementRepliersID,
          updatedContent
        );
        sendCommentBtn.dataset.action = "send-comment";
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

async function handleSendButtonEditChanges(
  commentTextArea,
  articleElementDataID,
  articleElementDataUsername,
  articleElementRepliersID
) {
  let sendCommentBtn =
    document.querySelector('button[data-action="send-comment"]') ||
    document.querySelector('button[data-action ="reply-comment"]');
  console.log(sendCommentBtn);
  if (sendCommentBtn.dataset.action !== "reply-comment") {
    sendCommentBtn.dataset.action = "reply-comment";
    sendCommentBtn.textContent = "Edit";
    sendCommentBtn.style.width = "116px";
    sendCommentBtn.style.fontWeight = "bold";
    handleSendCommentButtonClicked(
      sendCommentBtn,
      commentTextArea,
      articleElementDataID,
      articleElementDataUsername,
      articleElementRepliersID
    );
  }
}

// Attach a single event listener to the body for event delegation
comment.addEventListener("click", handleReplyEditButtonClicked);


