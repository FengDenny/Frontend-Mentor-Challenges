import { fetchALLComments } from "../endpoints/getEndpoints";
import { formatDate } from "../../Helper/time";
import CombinedCard from "../../Components/Card/CardImport";

async function renderComments() {
  try {
    const response = await fetchALLComments();
    const commentContainer = document.getElementById("comment");

    // Clear existing comments using hasChildNodes and removeChild
    // To update for new comments
    while (commentContainer.hasChildNodes()) {
      commentContainer.removeChild(commentContainer.firstChild);
    }

    for (const item of response.data) {
      const { content, createdAt, score, user, tag, id, edited, replies } =
        item;
      const timeCreated = formatDate(createdAt);

      // Modify replies to include originalID and originalUsername
      const modifiedReplies = replies.map((reply) => ({
        ...reply,
        originalID: id, // Add original comment ID
        originalUsername: user.username, // Add original username
      }));

      const card = new CombinedCard(
        score,
        content,
        id,
        user.username,
        user.image.png,
        user.username,
        timeCreated,
        tag,
        edited,
        modifiedReplies
      );

      const cardElement = await card.createCardElement();
      commentContainer.appendChild(cardElement);

      // Append replies as separate cards
      if (card.replies.length) {
        const repliesSection = await card.createRepliesSection();
        commentContainer.appendChild(repliesSection);

        const replyContainer = document.querySelectorAll(".replies-container");

        if (replyContainer) {
          replyContainer.forEach((container) => {
            const authBtnContainer = container.querySelectorAll(
              ".auth-btn-container"
            );
            authBtnContainer.forEach((container) => {
              const deleteBtn = container.querySelector("button.delete-btn");
              const editBtn = container.querySelector("button.edit-btn");

              delete deleteBtn.dataset.action;
              deleteBtn.dataset.replyAction = "delete-modal-reply-open";

              delete editBtn.dataset.action;
              editBtn.dataset.replyAction = "edit-reply";
            });
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

renderComments();

export { renderComments };
