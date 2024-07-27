const {
  doc,
  collection,
  where,
  getDocs,
  getDoc,
  query,
  addDoc,
  setDoc,
} = require("firebase/firestore");

async function getNextCommentId(db) {
    const idDocRef = doc(db, "config", "lastCommentId");
    const idDocSnapshot = await getDoc(idDocRef);
    let nextId = null;
  
    if (idDocSnapshot.exists()) {
      const data = idDocSnapshot.data();
      nextId = data.lastId + 1;
    } else {
      // always start the next id at 5 
      nextId = 5;
    }
  
    await setDoc(idDocRef, { lastId: nextId });
    return nextId;
  }
  

  module.exports = {getNextCommentId}