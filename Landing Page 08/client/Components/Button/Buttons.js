import { ReplyBtnIcon, EditBtnIcon, DeleteBtnIcon } from "../SVG/SVG";

function Buttons(isAuth) {
  this.isAuth = isAuth;
  this.deleteBtn = "Delete";
  this.editBtn = "Edit";
  this.replyBtn = "Reply";
}

Buttons.prototype.createButtons = function () {
  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";
  const authBtnContainer = document.createElement("div");
  authBtnContainer.className = "auth-btn-container";

  if (this.isAuth) {
    const deleteBtn = this.createButtonWithSVG(
      this.deleteBtn,
      DeleteBtnIcon,
      "delete-btn",
      "delete-modal-open", 
      true
    );
    authBtnContainer.appendChild(deleteBtn);


    const editBtn = this.createButtonWithSVG(
      this.editBtn,
      EditBtnIcon,
      "edit-btn",
      "edit-comment",
      true
    );
    authBtnContainer.appendChild(editBtn);
  } else {
    const replyBtn = this.createButtonWithSVG(
      this.replyBtn,
      ReplyBtnIcon,
      "reply-btn"
    );
    btnContainer.appendChild(replyBtn);
  }

  return { btnContainer, authBtnContainer };
};

Buttons.prototype.createButtonWithSVG = function (
  text,
  IconClass,
  className,
  buttonID,
  isButtonID  
) {
  const button = document.createElement("button");
  if(isButtonID){
    button.dataset.authAction = buttonID
  } 
  button.className = className;
  button.textContent = text;
  const icon = new IconClass();
  button.appendChild(icon.createSVGElement());
  return button;
};

Buttons.prototype.createButtonWithText = function (
  text,
  className,
  buttonID
) {
  const button = document.createElement("button");
  button.dataset.action = buttonID;
  button.className = className;
  button.textContent = text;
  return button;
};

export default Buttons;
