// require express
const express = require("express");
// require db connection
const db = require("../utils/database");
const router = express.Router();
// get all housing
router.get("/", (req, res) => {
  const query = `SELECT * FROM Housing`;
  db((client) => {
    client.query(query, (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        res.status(401).send();
      }
    });
  });
});

// Get housing by Email
router.get('/email/:email', (req, res) => {
    const query = `SELECT * FROM Housing INNER JOIN User ON User.id = Housing.User_id WHERE User.email= "${req.params.email}";`;
    db(client => {
        client.query(query, (err, result) => {
            if(!err && result.length) {
                res.send(result);
                console.log("Housing found");
            } else {
                console.log(err);
                console.log("wtfhousing");
                res.status(404).send('Housing not found.');
            }
        })
    });
})

// post housing by id
router.post('/id', (req, res) => {
    let id = req.body.user_id;
    const query = `SELECT * FROM Housing WHERE User_id= "${id}";`;
    console.log(query);
    db(client => {
        client.query(query, (err, result) => {
            if(!err && result.length) {
                res.send(result);
            } else {
                console.log("Housing not found");
                console.log(query);
                res.status(404).send('Housing not found.');
            }
        })
    });
})

//Get housing by ID
router.get("/:id", (req, res) => {
  const query = `SELECT * FROM Housing WHERE id=${req.params.id}`;
  db((client) => {
    client.query(query, (err, result) => {
      if (!err && result.length) {
        res.send(result);
      } else {
        res.status(404).send("Housing not found.");
      }
    });
  });
});

// Post housings
router.post('/create', (req, res) => {
    let housing = req.body.housing;
    let user_id = req.body.user_id;
    //console.log(housing.squarefeet);
    //Check if user exists in housing table
    const checkExistQuery = `SELECT * FROM Housing WHERE User_id = "${user_id}"`
    const insertQuery = `
    INSERT INTO Housing (address, neighborhood, squarefeet, lease, rent, garage, parking, gym, pool, appliances, furniture, AC, User_id)
    VALUES ("${housing.address}", "${housing.neighborhood}",
     "${housing.squarefeet}", "${housing.lease}", "${housing.rent}", 
     ${housing.garage}, ${housing.parking}, 
     ${housing.gym}, ${housing.pool}, 
     ${housing.appliances}, ${housing.furniture}, ${housing.AC}, "${user_id}")`;
    const updateQuery = `UPDATE Housing SET address="${housing.address}", neighborhood="${housing.neighborhood}", 
        squarefeet="${housing.squarefeet}", lease="${housing.lease}", rent="${housing.rent}", 
        garage=${housing.garage.toString()}, parking=${housing.parking.toString()}, gym=${housing.gym.toString()}, pool=${housing.pool.toString()}, 
        appliances=${housing.appliances.toString()}, furniture=${housing.furniture.toString()}, AC=${housing.AC.toString()} WHERE User_id=${user_id}`;
    db(client => {
        client.query(checkExistQuery, (err, result) => {
            //if result is not empty a user is found, update
            if(!err && (typeof result !== 'undefined') && (result.length > 0)){
                // console.log( "User found successfully.");
                console.log(result);
                console.log(result.length);
                db(client => {
                    client.query(updateQuery, (err) => {
                        if(err){
                            console.log(err);
                            res.status(400).send(`Bad Request.`)
                            return;
                        }
                        console.log('Update housing successfully from questionnaire');
                        res.send(`Update housing successfully from questionnaire`);
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
                        console.log('Insert housing successfully from questionnaire');
                        res.send(`Insert housing successfully from questionnaire`);
                    });
                });
            }
        });
    })
})

// Delete housings
router.post('/delete', (req, res) => {
    let user_id = req.body.user_id;
    //let User_id = req.body.user_id;
    const query = `
    DELETE FROM Housing WHERE User_id=${user_id}`;
    db(client => {
        client.query(query,(err,result) => {
            if(err){
                console.log(err);
                console.log(query);
                res.status(400).send(`Bad Request.`)
                return;
            }
            console.log('Delete housing successfully')
        });
    })   
})

module.exports = router;
