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

export {postNewComment}