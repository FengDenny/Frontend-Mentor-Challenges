import { api } from "../url";

async function postNewComment(){
    try {
        const newComment = await api
          .setEndpoint("/user-comments/new-comment")
          .post();
    
        return newComment;
      } catch (err) {
        console.error("Error:", err);
      }
}

export {postNewComment}