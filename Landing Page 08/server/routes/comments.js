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
  updateDoc,
} = require("firebase/firestore");

const {getNextCommentId} = require("../helper/comment")

const router = express.Router();

// Define more specific route first
router.get("/all-comments", async (req, res) => {
  try {
    //  Query the users collection to get all usernames
    const usersCollectionRef = collection(db, "users");
    const usersQuerySnapshot = await getDocs(usersCollectionRef);

    const allComments = [];

    // For each user, query their comments subcollection
    for (const userDoc of usersQuerySnapshot.docs) {
      const username = userDoc.id;
      const commentsCollectionRef = collection(
        db,
        `users/${username}/comments`
      );
      const commentsQuerySnapshot = await getDocs(commentsCollectionRef);

      //  Collect all comments
      const userComments = commentsQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        username: username,
      }));
      allComments.push(...userComments);
    }

    res.status(200).json(allComments);
  } catch (error) {
    console.error("Error retrieving all comments:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/new-comment", async (req, res) => {
  try {
    // Check for dummy auth user in the authenticated collection
    const authUserCollectionRef = collection(db, "authenticated");
    const authUserQuerySnapshot = await getDocs(authUserCollectionRef);

    if (authUserQuerySnapshot.empty) {
      return res.status(404).json({ error: "No authenticated user found." });
    }

    // Assuming there's only one authenticated user in the dummy auth setup
    const authUserData = authUserQuerySnapshot.docs[0].data();
    const username = authUserData.username;

    // Get the current date and time and format it to a human-readable string
    const now = new Date();

    // Reference to the user's comments subcollection / create new comment
    const userCommentsCollectionRef = collection(
      db,
      `users/${username}/comments`
    );

    // Check if the user document exists; if not, create it
    const commentUserDocRef = doc(db, `users/${username}`);
    const userDocSnapshot = await getDoc(commentUserDocRef);

    if (!userDocSnapshot.exists()) {
      // Creating user document if it doesn't exist before attempting to add comments
      await setDoc(commentUserDocRef, { username });
    }

    // Get new comment content from request body
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        error: "Comment content is required",
      });
    }

    // Generate the next comment ID
    const commentId = await getNextCommentId(db);

    const newComment = {
      id: commentId,
      content,
      createdAt: now.toISOString(),
      tag:"you",
      score: 0,
      replies: [],
      user: {
        username,
        image: authUserData.image,
      },
    };

    await addDoc(userCommentsCollectionRef, newComment);
    res
      .status(200)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding new comment:", error);
    res.status(500).json({ error: error.message });
  }
});


router.patch("/edit/:postID", async (req, res) => {
  try {
    const postID = req.params.postID;

    // Check for dummy auth user in the authenticated collection
    const authUserCollectionRef = collection(db, "authenticated");
    const authUserQuerySnapshot = await getDocs(authUserCollectionRef);

    if (authUserQuerySnapshot.empty) {
      return res.status(404).json({ error: "No authenticated user found." });
    }

    // Assuming there's only one authenticated user in the dummy auth setup
    const authUserData = authUserQuerySnapshot.docs[0].data();
    const username = authUserData.username;

    // Reference to the user's comments subcollection
    const userCommentsCollectionRef = collection(db, `users/${username}/comments`);

    // Check if the user document exists
    const commentUserDocRef = doc(db, `users/${username}`);
    const userDocSnapshot = await getDoc(commentUserDocRef);

    if (!userDocSnapshot.exists()) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    // Get the comment content from request body
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        error: "Comment content is required",
      });
    }

    // Find the specific comment by postID but first convert string to int
    const commentQuery = query(
      userCommentsCollectionRef,
      where("id", "==", parseInt(postID))
    );
    const commentSnapshot = await getDocs(commentQuery);

    if (commentSnapshot.empty) {
      return res.status(404).json({
        error: "Comment not found.",
      });
    }

    // Assuming only one comment will match the parseInt(postID)
    const commentDoc = commentSnapshot.docs[0];
    const commentData = commentDoc.data();

    // Get the current date and time
    const now = new Date().toISOString();

    // Update the comment with new content and edit date
    const updatedComment = {
      ...commentData,
      content,
      editedDate: now,
      edited:true,
    };

    // Update the comment document in Firestore
    await updateDoc(commentDoc.ref, updatedComment);

    res.status(200).json({
      message: "Comment edited successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ error: error.message });
  }
});


// Define parameterized route after the more specific route
router.get("/:user", async (req, res) => {
  try {
    const username = req.params.user;
    // Query for the user document based on username
    const commentsCollectionRef = collection(db, `users/${username}/comments`);
    const commentsQuerySnapshot = await getDocs(commentsCollectionRef);

    if (commentsQuerySnapshot.empty) {
      res.status(404).json({ error: "No comments found for this user" });
      return;
    }

    const comments = commentsQuerySnapshot.docs.map((doc) => doc.data());

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
