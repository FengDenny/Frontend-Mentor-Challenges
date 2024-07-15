const { doc, setDoc, collection, addDoc, getDoc } = require("firebase/firestore");
const { db } = require("./fbConfig.js");
const fs = require("fs");
const path = require("path");
const { get } = require("http");

async function importData() {
  try {
    // Reference to your collection
    const usersCollectionRef = collection(db, 'users');
    const currentUserCollectionRef = collection(db, "currentUser");

    // Read the contents of data.json using fs.readFileSync
    const dataFilePath = path.resolve(__dirname, "./data/data.json");
    const rawData = fs.readFileSync(dataFilePath, "utf-8");
    const initialData = JSON.parse(rawData);

    // Import current user data
    await setDoc(doc(currentUserCollectionRef, "currentUser"), initialData.currentUser);
    console.log(
      'Current user data imported successfully into Firestore under "currentUser" collection!'
    );

    // Import comments data
    const comments = initialData.comments;
    for (const comment of comments) {

      const commentUserDocRef =  doc(usersCollectionRef, comment.user.username)
      const userDocSnapshot = await getDoc(commentUserDocRef)

      if(!userDocSnapshot.exists()){
        // Creating user document if it doesn't exist before attemping to add comments
        // Crucial to prevent TypeError by ensuring we have a valid document reference
        await setDoc(commentUserDocRef, {username: comment.user.username})
      }

      // Under each user documnent, add subcollection of comments to add each comment as a separate document
      const commentsSubCollectionRef = collection(commentUserDocRef, "comments")

      await addDoc(commentsSubCollectionRef, {
        id:comment.id,
        content:comment.content,
        createdAt: comment.createdAt,
        score: comment.score,
        user: comment.user,
        replies: comment.replies || []
      })
      console.log(`Comment ${comment.id} added to user ${comment.user.username}'s document.`);
    }
    console.log(
      'Comments data imported successfully into Firestore under "comments" collection!'
    );

  } catch (error) {
    console.error("Error importing data: ", error);
  }
}

module.exports = { importData };
