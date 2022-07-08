const express = require('express');

const db = require('../utils/database');
const router = express.Router();


// Get housings
// router.get('/', (req, res) => {
//     db.query("SELECT * FROM Housing", (err, results) => {
//         if(!err){
//             res.send(results);
//         } else {
//             res.status(401).send();
//         }
//     })
// })

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
router.post('/', (req, res) => {
    let housing = req.body;
    const query = `
        INSERT INTO Housing (Name, Username, Password, Role, Gender, Age)
        VALUES ("${housing.Name}", "${housing.Username}", "${housing.Password}", "${housing.Role}", "${housing.Gender$}", "${housing.Age}")`;
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