import { PlusIcon, MinusIcon } from "../../Components/SVG/SVG";
import Buttons from "../../Components/Button/Buttons";
import { getAuthUser } from "../../API/endpoints/getEndpoints";

export async function createCardElements({ score, comment, usernameID, dataID }) {
    const cardArticle = document.createElement("article");
    cardArticle.className = "card";
    cardArticle.dataset.id = dataID;
    cardArticle.dataset.username = usernameID;
  
    // Create and append the score section
    const scoreSection = document.createElement("div");
    scoreSection.className = "score-section";
  
    // Create an instance of icons
    const plusIcon = new PlusIcon();
    const minusIcon = new MinusIcon();
  
    scoreSection.appendChild(plusIcon.createSVGElement());
  
    const scoreCountElement = document.createElement("span");
    scoreCountElement.textContent = score;
    scoreSection.appendChild(scoreCountElement);
  
    scoreSection.appendChild(minusIcon.createSVGElement());
  
    cardArticle.appendChild(scoreSection);
  
    // Add comment and reply button
    const commentElemnt = document.createElement("p");
    commentElemnt.className = "comment-p";
    commentElemnt.dataset.id = `${usernameID}-${dataID}-comment`
    commentElemnt.textContent = comment;
    cardArticle.appendChild(commentElemnt);
  
    try {
      const authUser = await getAuthUser(usernameID);
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
}
