import { createCardElements } from "@helper/utils/createCardElements";
import UserProfileCard from "./UserProfileCard";
import { formatDate } from "@helper/time";

function RepliesCard(reply) {
  this.reply = reply;
  this.userProfileCard = new UserProfileCard(
    reply.user.image.png,
    reply.user.username,
    formatDate(reply.createdAt),
    reply.tag,
    reply.edited
  );
}

RepliesCard.prototype.createRepliesCardElement = async function () {
  // Use createCardElements for consistent styling
  const replyCard = await createCardElements({
    score: this.reply.score,
    comment: this.reply.content,
    dataID: this.reply.id,
    usernameID: this.reply.user.username,
    replyingTo: this.reply.replyingTo,
    originalID: this.reply.originalID, // Add original ID
    originalUsername: this.reply.originalUsername, // Add original username
  });
  replyCard.className += " reply-card";

  // Create and append the user profile section
  const profileSection = this.userProfileCard.createProfileElements();
  // Insert profile section at the top
  replyCard.insertBefore(profileSection, replyCard.firstChild);

  return replyCard;
};

export default RepliesCard;
