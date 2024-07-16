const express = require('express');
const {  db } = require('../firebase/fbConfig');
const { collection, where, getDocs, query } = require('firebase/firestore');

const router = express.Router()

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
            const commentsCollectionRef = collection(db, `users/${username}/comments`);
            const commentsQuerySnapshot = await getDocs(commentsCollectionRef);

            //  Collect all comments
            const userComments = commentsQuerySnapshot.docs.map(doc => ({
                ...doc.data(),
                username: username
            }));
            allComments.push(...userComments);
        }

     res.status(200).json(allComments);
    } catch (error) {
        console.error("Error retrieving all comments:", error);
        res.status(500).json({ error: error.message });
    }
});


// Define parameterized route after the more specific route
router.get("/:user", async (req,res) => {
    try{
        const username = req.params.user
        // Query for the user document based on username
        const commentsCollectionRef = collection(db, `users/${username}/comments`);
        const commentsQuerySnapshot = await getDocs(commentsCollectionRef)

        if (commentsQuerySnapshot.empty) {
            res.status(404).json({ error: "No comments found for this user" });
            return;
        }

        const comments = commentsQuerySnapshot.docs.map(doc => doc.data())

        res.status(200).json(comments);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})


module.exports = router