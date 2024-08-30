import { updateButtonState } from "../butonStateUpdateHandler";

const comment = document.getElementById("comment");


async function handleReplyEditButtonClicked(event) {
  const target = event.target;

  if (target.matches('[data-reply-action="edit-reply"]')) {
      event.preventDefault();

      const articleElement = target.closest("article");
      if (!articleElement) return;

      const articleElementDataID = articleElement.dataset.original;
      const articleElementDataUsername = articleElement.dataset.originalUsername;
      const articleElementRepliersID = articleElement.dataset.id;
      const articleElementRepliersUsername = articleElement.dataset.username;

      const commentParagraph = document.querySelector(
          `.comment-p[data-id="${articleElementRepliersUsername}-${articleElementRepliersID}-comment"]`
      );

      if (commentParagraph) {
          const spanElement = commentParagraph.querySelector(".replying-to");
          if (spanElement) {
              spanElement.remove();
          }
          const commentTextArea = document.getElementById("add-comment");
          const currentComment = commentParagraph.textContent.trim();
          commentTextArea.placeholder = "Edit comment....";
          commentTextArea.value = currentComment;
          commentTextArea.focus();

          await updateButtonState(
              "edit-reply",
              "Edit",
              commentTextArea,
              articleElementDataID,
              articleElementDataUsername,
              articleElementRepliersID,
          );
      }
  }
}

// Attach a single event listener to the body for event delegation
comment.addEventListener("click", handleReplyEditButtonClicked);


