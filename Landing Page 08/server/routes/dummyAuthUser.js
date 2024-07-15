const express = require('express');
const {  db } = require('../firebase/fbConfig');
const { collection, where, getDocs, query } = require('firebase/firestore');

const router = express.Router()

router.get("/:username", async (req,res) => {
    try{
        const username = req.params.username
        const authUserCollectionRef = collection(db, "authenticated")
        const q = query(authUserCollectionRef, where("username", "==", username))
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty){
            res.status(404).json({
                error: 'User not found'
            })
            return
        }
        // Only one document per username (unique username)
        const userData = querySnapshot.docs[0].data()
        res.status(200).json(userData)
    
    }catch(error){
        console.error('Error retrieving user info:', error);
        res.status(500).json({ error: error.message });
    }
})

module.exports = router