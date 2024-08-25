import Card from "./Card";
import UserProfileCard from "./UserProfileCard";
function CombinedCard(
  score,
  comment,
  dataID,
  usernameID,
  userProfileImg,
  username,
  datePosted, 
  tag,
  edited
) {
  Card.call(this, score, comment, dataID, usernameID);
  UserProfileCard.call(this, userProfileImg, username, datePosted, tag, edited);
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

export default CombinedCard