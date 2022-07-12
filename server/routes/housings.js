// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

router.get('/', (req, res) => {

    db("SELECT * FROM Housing", (err, results) => {
        if(!err){
            res.send(results);
        } else {
            res.status(401).send();
        }
    })
})

// Get housing by ID
router.get('/:id', (req, res) => {
    db(`SELECT * FROM Housing WHERE UserID=${req.params.id}`, 
        (err, result) => {
            if(!err && result.length) {
                res.send(result);
            } else {
                res.status(404).send('Housing not found.');
            }
        });
})

// Post housings
router.post('/create', (req, res) => {
    let housing = req.body;
    const query = `
        INSERT INTO Housing (neighborhood, city, address, squarefeet, lease, rent, gargage, parking, gym, pool, appliances, furniture)
        VALUES ("${housing.neighborhood}", "${housing.city}", 
        "${housing.address}", "${housing.squarefeet}", "${housing.lease$}", "${housing.rent}", "${housing.gargage}", "${housing.parking}"
        , "${housing.gym}", "${housing.pool}", "${housing.appliances}", "${housing.furniture}")`;
    db(query,
        (err,result) => {
            if(err){
                console.log(err);
                res.status(400).send(`Bad Request.`)
                return;
            }
            res.send(`Insert successfully.`);
        });
})

// Delete housings

module.exports = router;