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


async function editReplies(username, commentID, postID, commentContent){

  try{
    const updateReply = await api.setEndpoint(`/user-comments/${username}/comments/${commentID}/replies/${postID}/update`)
    .setData({content:commentContent})
    .request("PATCH")
    return updateReply
  }catch(err){
    console.error("Error", err)
  }

}

export {editComment, editReplies
  
}