import Comment from "./Comment";
import { getAuthUser } from "../../API/endpoints/getEndpoints";

async function initializeAuthCommentForm() {
  try {
    const authUser = await getAuthUser("juliusomo");
    const comment = new Comment("Add a comment...", authUser);
    const commentForm = comment.createCommentForm();
    const sendButton = comment.createSendButton();
    const imageIcon = await comment.createAuthUserCommentIcon();

    const authCommentContainer = document.createElement("div");
    authCommentContainer.className = "auth-comment-container";

    authCommentContainer.appendChild(imageIcon);
    authCommentContainer.appendChild(sendButton);

    const authWriteDiv = document.getElementById("auth-write");

    if (authWriteDiv) {
      authWriteDiv.appendChild(commentForm);
      authWriteDiv.appendChild(authCommentContainer)
    } else {
      console.error("The div with ID 'auth-write' was not found.");
    }
  } catch (error) {
    console.error("Error initializing the comment form:", error);
  }
}

initializeAuthCommentForm();