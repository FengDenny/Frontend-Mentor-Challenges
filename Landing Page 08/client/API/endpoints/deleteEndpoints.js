import { api } from "../url";

async function deleteAuthUserComment(postID) {
    try {
      const deleteComment = await api
        .setEndpoint(`/user-comments/${postID}/delete`)
        .delete();
  
      return deleteComment;
    } catch (err) {
      console.error("Error:", err);
    }
  }
async function deleteAuthUserReply(username, commentID, postID) {
    try {
      const deleteComment = await api
        .setEndpoint(`/user-comments/${username}/comments/${commentID}/replies/${postID}/delete`)
        .delete();
      
      return deleteComment;
    } catch (err) {
      console.error("Error:", err);
    }
  }

export {deleteAuthUserComment, deleteAuthUserReply}