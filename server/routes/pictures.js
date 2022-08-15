const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();
/*
router.get('/getPic', (req, res) => {
    db(client => {
        let id = req.body.id;
        console.log("ID: " + id);
         const query = "SELECT profilepic from User WHERE id = " + id;
         client.query(query,(err, result) => {
             if (err) throw err;
             res.send(result);
         });
     });
});

router.get('/getMultiple', (req, res) => {
    db(client => {
        let id = req.body.id;
        console.log("ID: " + id);
         const query = "SELECT picsList from User WHERE id = " + id;
         client.query(query,(err, result) => {
             if (err) throw err;
             res.send(result);
         });
     });
});
*/
router.post('/profile', (req, res) => { 
    db(client => {
       let uri = req.body.uri;
       let id = req.body.id;
       uri = String(uri);
        const query = "UPDATE User SET profilepic = '" + uri + "' WHERE id = " + id;
        client.query(query,(err, result) => {
            if (err) throw err;
            res.send("Inserted successfully!");
        });
    });
});

router.post('/multiple', (req, res) => {
    db(client => {
        let id = req.body.id;
        let pics = req.body.pics;
        const query = "UPDATE User SET picsList = " + JSON.stringify(JSON.stringify(pics)) + " WHERE id  = " + id;
        client.query(query,(err, result) => {
            if (err) throw err;
            res.send("Inserted successfully!");
        });
    });
});

module.exports = router;
