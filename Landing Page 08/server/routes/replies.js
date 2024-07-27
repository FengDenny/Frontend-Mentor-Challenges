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


router.post("/:username/:postID/replies", async (req, res) => {
    try {
        const { username, postID } = req.params;

        // Reference to the specific comment collection
        const commentCollectionRef = collection(db, `users/${username}/comments`);
        
        // Query to find the document with the specific postID
        const q = query(commentCollectionRef, where("id", "==", parseInt(postID)));
        const querySnapshot = await getDocs(q);

        console.log("Query Snapshot:", querySnapshot.docs.map(doc => doc.data()));

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
