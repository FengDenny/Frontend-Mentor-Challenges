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
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = this.deleteBtn;
    const deleteBtnIcon = new DeleteBtnIcon();
    deleteBtn.appendChild(deleteBtnIcon.createSVGElement());
    authBtnContainer.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = this.editBtn;
    const editBtnIcon = new EditBtnIcon();
    editBtn.appendChild(editBtnIcon.createSVGElement());
    authBtnContainer.appendChild(editBtn);
  } else {
    const replyBtn = document.createElement("button");
    replyBtn.className = "reply-btn";
    replyBtn.textContent = this.replyBtn;
    const replyBtnIcon = new ReplyBtnIcon();
    replyBtn.appendChild(replyBtnIcon.createSVGElement());
    btnContainer.appendChild(replyBtn);
  }

  return {btnContainer ,authBtnContainer};
};

export default Buttons;
