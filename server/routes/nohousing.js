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
// Get housing by Email
router.get('/email/:email', (req, res) => {
    const query = `SELECT * FROM NoHousing JOIN User ON User.id = NoHousing.User_id WHERE User.email= "${req.params.email}";`;
    db(client => {
        client.query(query, (err, result) => {
            if(!err && result.length) {
                res.send(result);
            } else {
                console.log(err);
                res.status(404).send('Nohousing not found.');
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

// Get nohousing by Email
router.get('/email/:email', (req, res) => {
    const query = `SELECT * FROM NoHousing JOIN User ON User.id = NoHousing.User_id WHERE User.email= "${req.params.email}";`;
    db(client => {
        client.query(query, (err, result) => {
            if(!err && result.length) {
                res.send(result);
            } else {
                console.log("Nohousing not found");
                res.send("Nohousing not found");
            }
        })
    });
})

// Post housings
router.post('/create', (req, res) => {
    let housing = req.body.housing;
    let user_id = req.body.user_id;
    console.log(user_id);
    //Check if user exists in housing table
    const checkExistQuery = `SELECT * FROM NoHousing WHERE User_id = ${user_id}`
    const insertQuery = `
    INSERT INTO NoHousing (neighborhood, city, squarefeet, lease, rent, garage, parking, gym, pool, appliances, furniture, AC, User_id)
    VALUES (${JSON.stringify(JSON.stringify(housing.neighborhoodList))}, "${housing.city}",
     "${housing.squarefeet}", "${housing.lease}", "${housing.rent}", 
     ${housing.garage}, ${housing.parking}, 
     ${housing.gym}, ${housing.pool}, 
     ${housing.appliances}, ${housing.furniture}, ${housing.AC}, ${user_id})`;
    const updateQuery = `UPDATE NoHousing SET neighborhood=${JSON.stringify(JSON.stringify(housing.neighborhoodList))}, city="${housing.city}", 
        squarefeet="${housing.squarefeet}", lease="${housing.lease}", rent="${housing.rent}", 
        garage=${housing.garage.toString()}, parking=${housing.parking.toString()}, gym=${housing.gym.toString()}, pool=${housing.pool.toString()}, 
        appliances=${housing.appliances.toString()}, furniture=${housing.furniture.toString()}, AC=${housing.AC.toString()} WHERE User_id=${user_id}`;
    db(client => {
        client.query(checkExistQuery, (err, result) => {
            //if result is not empty a user is found, update
            if(result.length){
                // console.log( "User found successfully.");
                db(client => {
                    client.query(updateQuery, (err) => {
                        if(err){
                            console.log(err);
                            res.status(400).send(`Bad Request.`)
                            return;
                        }
                        console.log('Update nohousing successfully');
                        res.send(`Update nohousing successfully`);
                    });
                });
            } 
            //Else, user is not found. Insert
            else {
                db(client => {
                    client.query(insertQuery, (err) => {
                        if(err){
                            console.log(err);
                            res.status(400).send(`Bad Request.`)
                            return;
                        }
                        console.log('Insert nohousing successfully');
                        res.send(`Insert nohousing successfully`);
                    });
                });
            }
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