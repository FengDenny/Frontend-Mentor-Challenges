const express = require('express');
const {  db } = require('../firebase/fbConfig');
const { collection, getDocs } = require('firebase/firestore');

const router = express.Router()

router.get("/api/comments", async (req,res) => {
    try{
        const querySnapshot = await getDocs(collection(db, "comments"));
        const comments = querySnapshot.docs.map((doc) => doc.data())
        res.status(200).json(comments)
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})


module.exports = router