// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

// get all housing
router.get('/', (req, res) => {

    const query = `SELECT * FROM Housing`;
    db(client => {
        client.query(query, (err, results) => {
            if(!err){
                res.send(results);
            } else {
                res.status(401).send();
            }
        })
    });
})

// Get housing by ID
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM Housing WHERE id=${req.params.id}`;
    db(client => {
        client.query(query, (err, result) => {
            if(!err && result.length) {
                res.send(result);
            } else {
                res.status(404).send('Housing not found.');
            }
        })
    });
})

// Post housings
router.post('/create', (req, res) => {
    let housing = req.body;
    const query = `
        INSERT INTO Housing (neighborhood, city, address, squarefeet, rent, gargage, parking, gym, pool, appliances, furniture)
        VALUES ("${housing.neighborhood}", "${housing.city}", 
        "${housing.address}", "${housing.squarefeet}", "${housing.rent}", "${housing.gargage}", "${housing.parking}"
        , "${housing.gym}", "${housing.pool}", "${housing.appliances}", "${housing.furniture}")`;
    db(client => {
        client.query(query,(err,result) => {
            if(err){
                console.log(err);
                res.status(400).send(`Bad Request.`)
                return;
            }
            res.send(`Insert successfully.`);
        });
    })   
})

// Delete housings

module.exports = router;