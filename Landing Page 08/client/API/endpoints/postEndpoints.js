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

async function postNewReply(commentContent, username, postID){
  try {
    const newReply = await api
      .setEndpoint(`/user-comments/${username}/${postID}/replies`)
      .setData({content:commentContent})
      .request("POST");

    return newReply;
  } catch (err) {
    console.error("Error:", err);
  }
}

export {postNewComment, postNewReply}