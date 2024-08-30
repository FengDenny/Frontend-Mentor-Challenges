import { updateButtonState } from "../butonStateUpdateHandler";


const comment = document.getElementById("comment");


async function handleReplyButtonClicked(event) {
  const target = event.target;
  const replyButton = event.target.closest('.reply-btn');

  if (target.matches(".reply-btn") && replyButton.hasAttribute('data-id')) {
      event.preventDefault();
      const articleElement = target.closest("article");
      if (!articleElement) return;

      const articleElementDataID = articleElement.dataset.original;
      const articleElementDataUsername = articleElement.dataset.originalUsername;
      const replyID = articleElement.dataset.id;

      const commentTextArea = document.getElementById("add-comment");
      const reply = commentTextArea.textContent.trim();

      commentTextArea.placeholder = "Add a reply...";
      commentTextArea.value = reply;
      commentTextArea.focus();

      await updateButtonState(
        "reply-comment",
          "Reply",
          commentTextArea,
          articleElementDataID,
          articleElementDataUsername,
          replyID,
      );
  }
}




// Attach a single event listener to the body for event delegation
comment.addEventListener("click", handleReplyButtonClicked);