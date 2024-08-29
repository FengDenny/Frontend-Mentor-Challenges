import Card from "./Card";
import UserProfileCard from "./UserProfileCard";
import RepliesCard from "./RepliesCard";
import { createCardElements } from "@helper/utils/createCardElements";
function CombinedCard(
  score,
  comment,
  dataID,
  usernameID,
  userProfileImg,
  username,
  datePosted,
  tag,
  edited,
  replies, 
) {
  Card.call(this, score, comment, dataID, usernameID);
  UserProfileCard.call(this, userProfileImg, username, datePosted, tag, edited);
  this.replies = replies;
}

CombinedCard.prototype = Object.create(Card.prototype);
CombinedCard.prototype.constructor = CombinedCard;

// Set up inheritance to include methods from ExtendedCard
Object.assign(CombinedCard.prototype, UserProfileCard.prototype);


CombinedCard.prototype.createCardElement = async function () {
  const userProfileCard = this.createProfileElements(); // Create the profile elements

  // Call createCardElements with userProfileCard as a parameter
  const cardArticle = await createCardElements({
    score: this.score,
    comment: this.comment,
    dataID: this.dataID,
    usernameID: this.usernameID,
    userProfileCard: userProfileCard, // Pass the userProfileCard
  });

  return cardArticle;
};


CombinedCard.prototype.createRepliesSection = async function () {
  const repliesContainer = document.createElement("div");
  repliesContainer.className = "replies-container";

  // Create and append each reply card
  for (const reply of this.replies) {
    const replyCard = new RepliesCard(reply);
    const replyCardElement = await replyCard.createRepliesCardElement();
    repliesContainer.appendChild(replyCardElement);
  }

  return repliesContainer;
};

export default CombinedCard;
