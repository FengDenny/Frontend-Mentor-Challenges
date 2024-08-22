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

export {deleteAuthUserComment}