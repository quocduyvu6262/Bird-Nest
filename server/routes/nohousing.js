// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

// get all nohousing
router.get('/', (req, res) => {
    const query = `SELECT * FROM NoHousing`;
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

// get nohousing by user_id
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM NoHousing WHERE User_id=${req.params.id}`;
    db(client => {
        client.query(query, (err, result) => {
            if(!err && result.length) {
                res.send(result);
            } else {
                res.status(404).send('NoHousing not found.');
            }
        })
    });
})

// Post nohousings
router.post('/create', (req, res) => {
    let nohousing = req.body;
    const query = `
        INSERT INTO NoHousing (neighborhood, city, squarefeet, lease, rent, gargage, parking, gym, pool, appliances, furniture, AC)
        VALUES ("${nohousing.neighborhood}", "${nohousing.city}",
         "${nohousing.squarefeet}", "${nohousing.lease}", "${nohousing.rent}", 
         "${nohousing.gargage}", "${nohousing.parking}", 
         "${nohousing.gym}", "${nohousing.pool}", 
         "${nohousing.appliances}", "${nohousing.furniture}", "${nohousing.AC}, "${nohousing.User_id}")`;
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

// Delete nohousings
router.post('/delete', (req, res) => {
    let nohousing = req.body;
    const query = `
        DELETE FROM NoHousing WHERE User_id=${nohousing.User_id}`;
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