import Buttons from "../Button/Buttons";

function Comment(placeholder, authUser){
    this.placeholder = placeholder
    this.authUser = authUser,
    this.sendBtn = "Send"
}

Comment.prototype.createCommentForm = function(){
    const formComment = document.createElement("form")
    formComment.className = "comment-form"
    formComment.method = "POST"
    const commentTextArea = document.createElement("textarea")
    commentTextArea.id="add-comment"
    commentTextArea.name ="add-comment"
    commentTextArea.className ="comment"
    commentTextArea.rows ="4"
    commentTextArea.col ="50"
    commentTextArea.placeholder = this.placeholder
    formComment.appendChild(commentTextArea)
    return formComment
}

Comment.prototype.createAuthUserCommentIcon = async function(){
    if (this.authUser) {
        console.log("Current dummy auth user:", this.authUser);
        const imageIcon = document.createElement("img")
        imageIcon.src = this.authUser.image.png
        imageIcon.className ="auth-user-icon"
        imageIcon.alt =  this.authUser.username
        return imageIcon
    } else {
        return null;
    }
}

Comment.prototype.createSendButton = function(){
    const button = new Buttons(true)
    const sendButton = button.createButtonWithText(this.sendBtn, "send-btn", "send-comment")
    sendButton.type ="submit"
    return sendButton
}

export default Comment