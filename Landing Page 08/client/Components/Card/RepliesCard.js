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
  // Generate the user profile section
  const profileSection = this.userProfileCard.createProfileElements();

  // Use createCardElements and pass the profile section
  const replyCard = await createCardElements({
    score: this.reply.score,
    comment: this.reply.content,
    dataID: this.reply.id,
    usernameID: this.reply.user.username,
    replyingTo: this.reply.replyingTo,
    originalID: this.reply.originalID, // Add original ID
    originalUsername: this.reply.originalUsername, // Add original username
    userProfileCard: profileSection, // Pass the userProfileCard
  });

  replyCard.className += " reply-card";

  return replyCard;
};

export default RepliesCard;
