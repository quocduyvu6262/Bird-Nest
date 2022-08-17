const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

router.post('/multiple', (req, res) => {
    db(client => {
        let id = req.body.id;
        let pics = req.body.pics;
        const query = "UPDATE User SET picsList = " + JSON.stringify(JSON.stringify(pics)) + " WHERE id  = " + id;
        client.query(query,(err, result) => {
            if (err) throw err;
            console.log("Inserted multiple images successfully!");
        });
    });
});

module.exports = router;

