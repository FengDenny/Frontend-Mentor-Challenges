const express = require('express');

const {importData} = require("../firebase/importData")

const router = express.Router()

router.post("/api/import-data", async (req,res) => {
    try{
       await importData()
       res.status(200).send('Data import completed.');
    }catch(error){
        console.error('Error importing data:', error);
        res.status(500).send('Failed to import data.');
    }
})


module.exports = router