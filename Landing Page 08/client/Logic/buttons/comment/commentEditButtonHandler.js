
import { updateButtonState } from "../butonStateUpdateHandler";

const comment = document.getElementById("comment");

async function handleEditButtonClicked(event) {
  const target = event.target;

  if (target.matches('[data-auth-action="edit-comment"')) {
    event.preventDefault();

    const articleElement = target.closest("article");
    if (!articleElement) return;

    // Retrieve the article's unique ID and username
    const articleElementDataID = articleElement.dataset.id;
    const articleElementDataUsername = articleElement.dataset.username;

    // Find the corresponding comment paragraph within this article
    const commentParagraph = document.querySelector(
      `.comment-p[data-id="${articleElementDataUsername}-${articleElementDataID}-comment"]`
    );

    if (commentParagraph) {
      const commentTextArea = document.getElementById("add-comment");
      const currentComment = commentParagraph.textContent.trim();

      // Set the textarea placeholder and populate it with the current comment text
      commentTextArea.placeholder = "Edit comment....";
      commentTextArea.value = currentComment;
      // Scroll to the textarea or focus on it
      commentTextArea.focus();


      await updateButtonState(
        "edit-comment",
        "Edit Comment",
        commentTextArea,
        articleElementDataID
    );
    }
  }
}

// Attach a single event listener to the body for event delegation
comment.addEventListener("click", handleEditButtonClicked);
