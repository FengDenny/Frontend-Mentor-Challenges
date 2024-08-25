import Card from "./Card";
import UserProfileCard from "./UserProfileCard";
import RepliesCard from "./RepliesCard";
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
  replies
) {
  Card.call(this, score, comment, dataID, usernameID);
  UserProfileCard.call(this, userProfileImg, username, datePosted, tag, edited);
  this.replies = replies;
}

CombinedCard.prototype = Object.create(Card.prototype);
CombinedCard.prototype.constructor = CombinedCard;

// Set up inheritance to include methods from ExtendedCard
Object.assign(CombinedCard.prototype, UserProfileCard.prototype);

// Override createCardElement to include additional elements
CombinedCard.prototype.createCardElement = async function () {
  const cardArticle = await Card.prototype.createCardElement.call(this);
  const userProfileCard = this.createProfileElements();

  cardArticle.appendChild(userProfileCard);

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
