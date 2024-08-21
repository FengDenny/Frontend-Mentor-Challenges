import { PlusIcon, MinusIcon } from "../SVG/SVG";
import { getAuthUser } from "../../API/endpoints/getEndpoints";
import Buttons from "../Button/Buttons";

function Card(score, comment, dataID, usernameID) {
  this.score = score;
  this.comment = comment;
  this.dataID = dataID;
  this.usernameID = usernameID;
}

Card.prototype.createCardElement = async function () {
  const cardArticle = document.createElement("article");
  cardArticle.className = "card";
  cardArticle.dataset.id = this.dataID;
  cardArticle.dataset.username = this.usernameID;

  // Create and append the score section
  const scoreSection = document.createElement("div");
  scoreSection.className = "score-section";

  // Create an instance of icons
  const plusIcon = new PlusIcon();
  const minusIcon = new MinusIcon();

  scoreSection.appendChild(plusIcon.createSVGElement());

  const scoreCountElement = document.createElement("span");
  scoreCountElement.textContent = this.score;
  scoreSection.appendChild(scoreCountElement);

  scoreSection.appendChild(minusIcon.createSVGElement());

  cardArticle.appendChild(scoreSection);

  // Add comment and reply button
  const commentElemnt = document.createElement("p");
  commentElemnt.className = "comment-p";
  commentElemnt.textContent = this.comment;
  cardArticle.appendChild(commentElemnt);

  try {
    const authUser = await getAuthUser(this.usernameID);
    const isAuth = !!authUser; // Convert to boolean, true if authUser exists
    // Create buttons based on authentication status
    
    if(isAuth){
        const buttons = new Buttons(isAuth);
        const buttonElement = buttons.createButtons().authBtnContainer;
        cardArticle.appendChild(buttonElement);

    }else{
        const buttons = new Buttons(isAuth);
        const buttonElement = buttons.createButtons().btnContainer;
        cardArticle.appendChild(buttonElement);
    }
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
  }
  return cardArticle;
};

export default Card;
