import { createCardElements } from "../../Helper/utils/createCardElements";

function RepliesCard(reply) {
  this.reply = reply;
}

RepliesCard.prototype.createRepliesCardElement = async function () {
  // Use createCardElements for consistent styling
  const replyCard = await createCardElements({
    score: this.reply.score,
    comment: this.reply.content, 
    dataID: this.reply.id, 
    usernameID: this.reply.user.username,
    replyingTo: this.reply.replyingTo
  });
  replyCard.className += " reply-card";

  return replyCard;
};

export default RepliesCard;
