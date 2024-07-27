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
} = require("firebase/firestore");


const {getNextCommentId} = require("../helper/comment")
const router = express.Router();

router.get('/:username/:postID/comment-replies', async (req, res) => {
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
        console.error('Error getting replies:', error);
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
            user: {
                username: currentUser,
                image: authUserSnapshot.data().image
            }
        };

        // Update the comment's replies field
        await updateDoc(commentDocRef, {
            replies: arrayUnion(newReply)
        });

        res.status(201).json({ message: "Reply added successfully", reply: newReply });
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
