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

 //Get housing by ID
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

// Get housing by Email
router.get('/:email', (req, res) => {
    const query = `SELECT * FROM BirdNest.Housing JOIN BirdNest.User ON User.id = Housing.User_id WHERE User.email= "${req.params.email}";`;
    db(client => {
        client.query(query, (err, result) => {
            if(!err && result.length) {
                res.send(result);
            } else {
                console.log("nope");
                res.status(404).send('Housing not found.');
            }
        })
    });
})
// Post housings
router.post('/create', (req, res) => {
    let housing = req.body;
    const query = `
        INSERT INTO Housing (neighborhood, city, squarefeet, lease, rent, garage, parking, gym, pool, appliances, furniture, AC, user_id)
        VALUES ("${housing.neighborhood}", "${housing.city}",
         "${housing.squarefeet}", "${housing.lease}", "${housing.rent}", 
         "${housing.garage}", "${housing.parking}", 
         "${housing.gym}", "${housing.pool}", 
         "${housing.appliances}", "${housing.furniture}", "${housing.AC}", "${housing.User_id}")`;
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
router.post('/delete', (req, res) => {
    let housing = req.body;
    const query = `
    DELETE FROM Housing WHERE User_id=${housing.User_id}`;
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
module.exports = router;
