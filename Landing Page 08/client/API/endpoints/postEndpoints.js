import { api } from "../url";

async function postNewComment(commentContent){
    try {
        const newComment = await api
          .setEndpoint("/user-comments/new-comment")
          .setData({content:commentContent})
          .request("POST");
    
        return newComment;
      } catch (err) {
        console.error("Error:", err);
      }
}

async function postNewCommentReply(commentContent, username, postID){
  try {
    const newCommentReply = await api
      .setEndpoint(`/user-comments/${username}/${postID}/replies`)
      .setData({content:commentContent})
      .request("POST");

    return newCommentReply;
  } catch (err) {
    console.error("Error:", err);
  }
}
async function postNewReply(commentContent, username, commentID, replyID){
  try {
    const newReply = await api
      .setEndpoint(`/user-comments/${username}/comments/${commentID}/replies/${replyID}`)
      .setData({content:commentContent})
      .request("POST");

    return newReply;
  } catch (err) {
    console.error("Error:", err);
  }
}

export {postNewComment, postNewReply, postNewCommentReply}