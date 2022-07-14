// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

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

//Store the buttons (Correspond to variables) a user clicked in an array (each button adds an element to the array)
//Insert the strings into queries. Where 'variable' = 'variable_value
/*
router.get('/filtered', (req, res) => {
    const filterVars = ["id", "fullname", "role", "gender", "age", "graduationyear", "major", "pet"];
    //const filterVars = [];
    //filterVars.push(var);
    incompleteQuery = "SELECT ";
    for (let i = 0; i < filterVars.length -1; i++) {    //skip last element because last doesnt have comma
        incompleteQuery += filterVars[i] + ", ";
    }
    incompleteQuery += filterVars[filterVars.length -1] + " FROM User;";
    //const query = "SELECT id, fullname, role, gender, age, graduationyear, major, pet FROM User;";
    const query = incompleteQuery;
    db(client => {
        client.query(query, (err, results) => {
            if(!err){
                res.send(results);
            } else {
                //res.status(401).send("No users matching those filters found");
                console.log(err);
                res.status(401).send(results);
            }
        })
    });
})
*/
router.post('/filtered', (req, res) => {
    //const filterVars = ["id", "fullname", "role", "gender", "age", "graduationyear", "major", "pet"];
    //
    //const filterMap = new Map([["gargage", 1], ["parking", 1], ["gym", 1], ["appliances", 1]]); 
    const filterMap = req.body;
    console.log(filterMap);
    let incompleteQuery = "SELECT * ";
    //SELECT filtervars
    //const iterator  = filterMap.entries()
    //const firstKey = iterator.next()
    //const firstEntry = firstkey.value;
    //SELECT firstvar 
    //incompleteQuery = "SELECT " + firstEntry + " ";
    //for (const key of filterMap.keys()) {
    //    incompleteQuery += key + " , ";
    //}
    //incompleteQuery = incompleteQuery.slice(0, incompleteQuery.length -2); 
    //SELECT filtervars FROM User WHERE
    incompleteQuery += "FROM Housing WHERE ";
    /*
    filterMap.forEach(function(value, key) {
        incompleteQuery += key + "=" + value.toString() + " AND ";
    })
    */

    for (let key in filterMap) {
        incompleteQuery += key + "=" + filterMap[key].toString() + " AND ";
    }


    incompleteQuery = incompleteQuery.slice(0, incompleteQuery.length -4);
    incompleteQuery += ";"
    //SELECT filtervars FROM User WHERE filtervars = values;
    //const filterVars = [];
    //filterVars.push(var);
    
    //for (let i = 0; i < filterVars.length -1; i++) {    //skip last element because last doesnt have comma
    //    incompleteQuery += filterVars[i] + ", ";
    //}
    //incompleteQuery += filterVars[filterVars.length -1] + " FROM User;";
    //const query = "SELECT id, fullname, role, gender, age, graduationyear, major, pet FROM User WHERE id=5;";
    const query = incompleteQuery;
    db(client => {
        client.query(query, (err, results) => {
            if(!err){
                res.send(results);
            } else {
                //res.status(401).send("No users matching those filters found");
                console.log(err);
                console.log(query);
                console.log(filterMap);
                res.status(401).send(results);
            }
        })
    });
})

// Get housing by ID
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM Housing WHERE UserID=${req.params.id}`;
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
        INSERT INTO Housing (neighborhood, city, address, squarefeet, lease, rent, gargage, parking, gym, pool, appliances, furniture)
        VALUES ("${housing.neighborhood}", "${housing.city}", 
        "${housing.address}", "${housing.squarefeet}", "${housing.lease$}", "${housing.rent}", "${housing.gargage}", "${housing.parking}"
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