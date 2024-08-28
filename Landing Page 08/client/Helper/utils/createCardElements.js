import { PlusIcon, MinusIcon } from "../../Components/SVG/SVG";
import Buttons from "../../Components/Button/Buttons";
import { getAuthUser } from "../../API/endpoints/getEndpoints";

export async function createCardElements({
  score,
  comment,
  usernameID,
  dataID,
  replyingTo,
  originalID,
  originalUsername,
}) {
  const cardArticle = document.createElement("article");
  cardArticle.className = "card";
  cardArticle.dataset.id = dataID;
  cardArticle.dataset.username = usernameID;

  if (originalID && originalUsername) {
    cardArticle.dataset.original = originalID;
    cardArticle.dataset.originalUsername = originalUsername;
  }

  // Create and append the score section
  const scoreSection = document.createElement("div");
  scoreSection.className = "score-section";

  // Create an instance of icons
  const plusIcon = new PlusIcon();
  const minusIcon = new MinusIcon();

  // Create the SVG elements
  const plusSVGElement = plusIcon.createSVGElement();
  const minusSVGElement = minusIcon.createSVGElement();

  plusSVGElement.dataset.id = "plus-icon";
  minusSVGElement.dataset.id = "minus-icon";
  
  scoreSection.appendChild(plusSVGElement);

  const scoreCountElement = document.createElement("span");
  scoreCountElement.textContent = score;
  scoreCountElement.dataset.id = "score";
  scoreSection.appendChild(scoreCountElement);

  scoreSection.appendChild(minusSVGElement);

  cardArticle.appendChild(scoreSection);

  // Add comment and reply button
  const commentElement = document.createElement("p");
  commentElement.className = "comment-p";
  commentElement.dataset.id = `${usernameID}-${dataID}-comment`;

  const span = document.createElement("span");
  span.className = "replying-to";

  span.textContent = `@${replyingTo} `;

  if (replyingTo) {
    commentElement.textContent = "";
    // Append the span and the comment text separately
    commentElement.appendChild(span);
    commentElement.appendChild(document.createTextNode(comment));
  } else {
    commentElement.textContent = comment;
  }
  cardArticle.appendChild(commentElement);

  try {
    const authUser = await getAuthUser(usernameID);
    const isAuth = !!authUser; // Convert to boolean, true if authUser exists
    // Create buttons based on authentication status

    if (isAuth) {
      const buttons = new Buttons(isAuth);
      const buttonElement = buttons.createButtons().authBtnContainer;
      cardArticle.appendChild(buttonElement);
    } else {
      const buttons = new Buttons(isAuth);
      const buttonElement = buttons.createButtons().btnContainer;
      cardArticle.appendChild(buttonElement);
    }
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
  }
  return cardArticle;
}
