import { fetchALLComments } from "../endpoints/getEndpoints";
import { formatDate } from "../../Helper/time";
import CombinedCard from "../../Components/Card/CardImport";
import RepliesCard from "../../Components/Card/RepliesCard";

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
        replies
      );

      const cardElement = await card.createCardElement();
      commentContainer.appendChild(cardElement);

       // Append replies as separate cards
      if (card.replies.length) {
        const repliesSection = await card.createRepliesSection();
        commentContainer.appendChild(repliesSection);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

renderComments();

export { renderComments };
