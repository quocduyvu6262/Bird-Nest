// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

<<<<<<< HEAD
// get all housing
=======
>>>>>>> dev
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
<<<<<<< HEAD
    const query = `SELECT * FROM Housing WHERE id=${req.params.id}`;
=======
    const query = `SELECT * FROM Housing WHERE UserID=${req.params.id}`;
>>>>>>> dev
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
<<<<<<< HEAD
        INSERT INTO Housing (neighborhood, city, address, squarefeet, rent, gargage, parking, gym, pool, appliances, furniture)
        VALUES ("${housing.neighborhood}", "${housing.city}", 
        "${housing.address}", "${housing.squarefeet}", "${housing.rent}", "${housing.gargage}", "${housing.parking}"
=======
        INSERT INTO Housing (neighborhood, city, address, squarefeet, lease, rent, gargage, parking, gym, pool, appliances, furniture)
        VALUES ("${housing.neighborhood}", "${housing.city}", 
        "${housing.address}", "${housing.squarefeet}", "${housing.lease$}", "${housing.rent}", "${housing.gargage}", "${housing.parking}"
>>>>>>> dev
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