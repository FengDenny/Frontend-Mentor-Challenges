const express = require("express");
const { db } = require("../firebase/fbConfig");
const {
  doc,
  collection,
  where,
  getDocs,
  getDoc,
  query,
  addDoc,
  setDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  deleteDoc,
} = require("firebase/firestore");

const { getNextCommentId } = require("../helper/comment");
const router = express.Router();

router.get("/:username/:postID/comment-replies", async (req, res) => {
  try {
    const { username, postID } = req.params;
    const commentCollectionRef = collection(db, `users/${username}/comments`);
    const q = query(commentCollectionRef, where("id", "==", parseInt(postID)));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "No replies found" });
    }
    // Assuming only one document will match the query
    const commentDoc = querySnapshot.docs[0]; // Get the first document
    const commentData = commentDoc.data(); // Get the data from the document
    const replies = commentData.replies || []; // Extract the replies field

    res.status(200).json({ replies });
  } catch (error) {
    console.error("Error getting replies:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/:username/:postID/replies", async (req, res) => {
  try {
    const { username, postID } = req.params;

    // Reference to the specific comment collection
    const commentCollectionRef = collection(db, `users/${username}/comments`);

    // Query to find the document with the specific postID
    const q = query(commentCollectionRef, where("id", "==", parseInt(postID)));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      res.status(404).json({ error: "No post found" });
      return;
    }

    // Get the document reference from the query result
    const commentDocRef = querySnapshot.docs[0].ref;

    // Get new reply content from request body
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Reply content is required" });
    }

    // Retrieve authenticated user
    const authUserDocRef = doc(db, "authenticated", "current");
    const authUserSnapshot = await getDoc(authUserDocRef);

    if (!authUserSnapshot.exists()) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const currentUser = authUserSnapshot.data().username;

    // Generate a unique ID for the new reply
    const newReplyId = await getNextCommentId(db);

    // Create a new reply
    const newReply = {
      id: newReplyId,
      content,
      createdAt: Timestamp.now().toDate().toISOString(),
      score: 0,
      replyingTo: username,
      tag: "you",
      user: {
        username: currentUser,
        image: authUserSnapshot.data().image,
      },
    };

    // Update the comment's replies field
    await updateDoc(commentDocRef, {
      replies: arrayUnion(newReply),
    });

    res
      .status(201)
      .json({ message: "Reply added successfully", reply: newReply });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ error: error.message });
  }
});
router.patch(
  "/:username/comments/:commentID/replies/:replyID/update",
  async (req, res) => {
    try {
      const { username, commentID, replyID } = req.params;
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: "Reply content is required" });
      }

      // Retrieve the authenticated user
      const authUserDocRef = doc(db, "authenticated", "current");
      const authUserSnapshot = await getDoc(authUserDocRef);
      if (!authUserSnapshot.exists()) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const currentUser = authUserSnapshot.data().username;

      // Reference to the specific comment document
      const commentCollectionRef = collection(db, `users/${username}/comments`);
      const q = query(
        commentCollectionRef,
        where("id", "==", parseInt(commentID))
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        res.status(404).json({ error: "No reply found" });
        return;
      }

      const commentDoc = querySnapshot.docs[0];
      const commentDocRef = commentDoc.ref;
      const commentData = commentDoc.data();
      const replies = commentData.replies || [];

      // Find the specific reply to update
      // Suitable for only small datasets O(n) T.C
      const replyIndex = replies.findIndex(
        (reply) => reply.id === parseInt(replyID)
      );

      if (replyIndex === -1) {
        return res
          .status(404)
          .json({ error: "No reply found with the specified ID" });
      }

      // Check if the current user is the one who wrote the reply
      const replyToUpdate = replies[replyIndex];
      if (replyToUpdate.user.username !== currentUser) {
        return res
          .status(403)
          .json({ error: "Unauthorized to update this reply" });
      }

      // If current user, update
      const updateReplies = [...replies];

      updateReplies[replyIndex] = {
        ...updateReplies[replyIndex],
        content: content || updateReplies[replyIndex].content,
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(commentDocRef, {
        replies: updateReplies,
      });

      res.status(200).json({
        message: "Reply updated successfully",
        updatedReply: updateReplies[replyIndex],
      });
    } catch (error) {
      console.error("Error updating reply:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete("/:commentID/delete", async (req, res) => {
  try {
    const { commentID } = req.params;

    const authUserDocRef = doc(db, "authenticated", "current");
    const authUserSnapshot = await getDoc(authUserDocRef);
    if (!authUserSnapshot.exists()) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const currentUser = authUserSnapshot.data().username;

    // Reference to the user's comments collection
    // Here, we'll query all users' comments to find the one belonging to the current user
    const commentsCollectionRef = collection(
      db,
      `users/${currentUser}/comments`
    );
    const q = query(
      commentsCollectionRef,
      where("id", "==", parseInt(commentID))
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      res.status(404).json({ error: "No comment found" });
      return;
    }

    // Get the comment document and check if the authenticated user is the author
    const commentDoc = querySnapshot.docs[0];
    const commentData = commentDoc.data();

    if (commentData.user.username !== currentUser) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this comment" });
    }

    await deleteDoc(commentDoc.ref);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: error.message });
  }
});
router.delete(
  "/:username/comments/:commentID/replies/:replyID/delete",
  async (req, res) => {
    try {
      const { username, commentID, replyID } = req.params;

      const authUserDocRef = doc(db, "authenticated", "current");
      const authUserSnapshot = await getDoc(authUserDocRef);
      if (!authUserSnapshot.exists()) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const currentUser = authUserSnapshot.data().username;

      // Reference to the user's comments collection
      const commentsCollectionRef = collection(
        db,
        `users/${username}/comments`
      );
      const q = query(
        commentsCollectionRef,
        where("id", "==", parseInt(commentID))
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        res.status(404).json({ error: "No comment found" });
        return;
      }

      // Get the comment document and check if the authenticated user is the author
      const commentDoc = querySnapshot.docs[0];
      const commentDocRef = commentDoc.ref;
      const commentData = commentDoc.data();
      const replies = commentData.replies || [];

      // Find the specific reply to update
      const replyIndex = replies.findIndex(
        (reply) => reply.id === parseInt(replyID)
      );

      if (replyIndex === -1) {
        return res
          .status(404)
          .json({ error: "No reply found with the specified ID" });
      }

      // Check if the current user is the one who wrote the reply
      const replyToDelete = replies[replyIndex];
      if (replyToDelete.user.username !== currentUser) {
        return res
          .status(403)
          .json({ error: "Unauthorized to delete this reply" });
      }

      // Remove the reply from the replies array
      const updatedReplies = replies.filter(
        (reply) => reply.id !== parseInt(replyID)
      );

      await updateDoc(commentDocRef, { replies: updatedReplies });

      res.status(200).json({ message: "Reply deleted successfully" });
    } catch (error) {
      console.error("Error deleting reply:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
