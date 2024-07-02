const { doc, setDoc, collection, getDocs } = require('firebase/firestore');
const { db } = require( "./fbConfig.js");
const fs = require("fs");
const path = require('path');


async function importData() {
  try {

    // Reference to your collection
    const commentsCollectionRef = collection(db, 'comments');

    // Query to get documents in the collection
    const querySnapshot = await getDocs(commentsCollectionRef);

    // Read the contents of data.json using fs.readFileSync

    if(querySnapshot.size === 0){
          const dataFilePath = path.resolve(__dirname, './data/data.json');
          // Read the contents of data.json
          const rawData = fs.readFileSync(dataFilePath, 'utf-8');
          const initialData = JSON.parse(rawData);
          await setDoc(doc(db, 'comments', 'initialData'), initialData);
          console.log(
            'data imported successfully into Firestore under "comments" collection with document ID "comments"!'
          );
    } else {
      // Collection already has documents, do nothing or handle accordingly
      console.log('Collection "comments" already has documents.');
    }

  } catch (error) {
    console.error("Error importing data: ", error);
  }
}

module.exports = { importData };