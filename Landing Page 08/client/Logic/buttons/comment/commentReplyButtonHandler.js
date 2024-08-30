import { updateButtonState } from "../butonStateUpdateHandler";


const comment = document.getElementById("comment");

async function handleReplyButtonClicked(event) {
  const target = event.target;
  const replyButton = event.target.closest('.reply-btn');

  if (target.matches(".reply-btn") && !replyButton.hasAttribute('data-id')) {
    event.preventDefault();
    const articleElement = target.closest("article");
    if (!articleElement) return;

    // // Retrieve the article's unique ID and username
    const articleElementDataID = articleElement.dataset.id;
    const articleElementDataUsername = articleElement.dataset.username;

    console.log(articleElementDataID, articleElementDataUsername)

    const commentTextArea = document.getElementById("add-comment");
    const reply = commentTextArea.textContent.trim();

    commentTextArea.placeholder = "Add a reply...";
    commentTextArea.value = reply;
    commentTextArea.focus();

    
    await updateButtonState(
      "new-comment-reply",
        "Reply",
        commentTextArea,
        articleElementDataID,
        articleElementDataUsername,
    );
  }
}

// Attach a single event listener to the body for event delegation
comment.addEventListener("click", handleReplyButtonClicked);