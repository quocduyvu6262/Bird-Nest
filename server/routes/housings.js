// require express
const express = require("express");

// require db connection
const db = require("../utils/database");
const router = express.Router();

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

// Get housing by ID
router.get("/:id", (req, res) => {
  const query = `SELECT * FROM Housing WHERE UserID=${req.params.id}`;
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
router.post("/create", (req, res) => {
  let housing = req.body;
  const query = `
        INSERT INTO Housing (neighborhood, city, address, squarefeet, lease, rent, gargage, parking, gym, pool, appliances, furniture)
        VALUES ("${housing.neighborhood}", "${housing.city}", 
        "${housing.address}", "${housing.squarefeet}", "${housing.lease$}", "${housing.rent}", "${housing.gargage}", "${housing.parking}"
        , "${housing.gym}", "${housing.pool}", "${housing.appliances}", "${housing.furniture}")`;
  db((client) => {
    client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(`Bad Request.`);
        return;
      }
      res.send(`Insert successfully.`);
    });
  });
});

// Delete housings

module.exports = router;
