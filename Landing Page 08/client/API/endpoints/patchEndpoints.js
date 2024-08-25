import { api } from "../url";

async function editComment(commentContent, postID){
    try {
        const newComment = await api
          .setEndpoint(`/user-comments/edit/${postID}`)
          .setData({content:commentContent})
          .request("PATCH");
    
        return newComment;
      } catch (err) {
        console.error("Error:", err);
      }
}

export {editComment}