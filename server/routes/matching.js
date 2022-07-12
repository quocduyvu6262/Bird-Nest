// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

router.get('/', (req, res) => {
    const query = '';
    db(query, (err, result) => {
        if(err){
            console.log(err);
            res.status.send(`Bad request`);
            return;
        }
        // Execute algorithm
        
    })
})