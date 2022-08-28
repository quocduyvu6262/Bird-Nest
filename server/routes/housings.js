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

//Get housing by ID
router.get("/:id", (req, res) => {
  const query = `SELECT * FROM Housing WHERE User_id=${req.params.id}`;
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

// Get housing by Email
router.get("/email/:email", (req, res) => {
  const query = `SELECT * FROM Housing JOIN User ON User.id = Housing.User_id WHERE User.email= "${req.params.email}";`;
  db((client) => {
    client.query(query, (err, result) => {
      if (!err && result.length) {
        res.send(result);
      } else {
        console.log("Housing not found");
        res.status(404).send("Housing not found.");
      }
    });
  });
});

// Post housings
router.post('/create', (req, res) => {
  let housing = req.body.housing;
  let user_id = req.body.user_id;
  const updateOrInsertIfNotExistQuery = `REPLACE INTO 
      Housing(neighborhood, squarefeet, lease, 
            rent, garage, parking, gym, pool, 
            appliances, furniture, AC, User_id)
      VALUES ("${housing.neighborhood}",
      "${housing.squarefeet}", "${housing.lease}", "${housing.rent}", 
      ${housing.garage}, ${housing.parking}, 
      ${housing.gym}, ${housing.pool}, 
      ${housing.appliances}, ${housing.furniture}, ${housing.AC}, "${user_id}") `;
  db(client => {
    client.query(updateOrInsertIfNotExistQuery,(err, result) => {
      if(err){
        console.log("Fail to update/insert housing from questionnaire");
        throw err;
      }
      console.log("Update/insert housing successfully from questionnaire")
    })
  })
})

// Delete housings
router.post("/delete", (req, res) => {
  let user_id = req.body.user_id;
  //let User_id = req.body.user_id;
  const query = `
    DELETE FROM Housing WHERE User_id=${user_id}`;
  db((client) => {
    client.query(query, (err, result) => {
      if (err) {
        console.log("Fail to delete housing");
        return;
      }
      console.log("Delete housing successfully");
    });
  });
});

module.exports = router;
