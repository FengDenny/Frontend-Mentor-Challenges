import { createCardElements } from "@helper/utils/createCardElements";

function Card(score, comment, dataID, usernameID) {
  this.score = score;
  this.comment = comment;
  this.dataID = dataID;
  this.usernameID = usernameID;
}


Card.prototype.createCardElement = async function () {
  const cardArticle = await createCardElements({
    score: this.score,
    comment: this.comment,
    usernameID: this.usernameID,
    dataID:this.dataID
  });
  
  return cardArticle;
};

export default Card;
