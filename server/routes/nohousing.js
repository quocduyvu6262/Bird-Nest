// require express
const express = require("express");

// require db connection
const db = require("../utils/database");
const router = express.Router();

// get all nohousing
router.get("/", (req, res) => {
  const query = `SELECT * FROM NoHousing`;
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
router.get("/email/:email", (req, res) => {
  const query = `SELECT * FROM NoHousing JOIN User ON User.id = NoHousing.User_id WHERE User.email= "${req.params.email}";`;
  db((client) => {
    client.query(query, (err, result) => {
      if (!err && result.length) {
        res.send(result);
      } else {
        console.log(err);
        res.status(404).send("Nohousing not found.");
      }
    });
  });
});
// get nohousing by user_id
router.get("/:id", (req, res) => {
  const query = `SELECT * FROM NoHousing WHERE User_id=${req.params.id}`;
  db((client) => {
    client.query(query, (err, result) => {
      if (!err && result.length) {
        res.send(result);
      } else {
        res.status(404).send("NoHousing not found.");
      }
    });
  });
});


// Post nohousings
router.post('/create', (req, res) => {
  let housing = req.body.housing;
  let user_id = req.body.user_id;
  const updateOrInsertIfNotExistQuery = `REPLACE INTO 
      NoHousing(neighborhood, squarefeet, lease, 
            rent, garage, parking, gym, pool, 
            appliances, furniture, AC, User_id)
      VALUES (${JSON.stringify(JSON.stringify(housing.neighborhoodList))},
      "${housing.squarefeet}", "${housing.lease}", "${housing.rent}", 
      ${housing.garage}, ${housing.parking}, 
      ${housing.gym}, ${housing.pool}, 
      ${housing.appliances}, ${housing.furniture}, ${housing.AC}, "${user_id}") `;
  db(client => {
    client.query(updateOrInsertIfNotExistQuery,(err, result) => {
      if(err){
        console.log("Fail to update/insert nohousing from questionnaire");
        throw err;
      }
      console.log("Update/insert nohousing successfully from questionnaire")
    })
  })

})

// Delete nohousings
router.post("/delete", (req, res) => {
  let user_id = req.body.user_id;
  const query = `
        DELETE FROM NoHousing WHERE User_id=${user_id}`;
  db((client) => {
    client.query(query, (err, result) => {
      if (err) {
        console.log("Fail to delete nohousing");
        return;
      }
      console.log("Delete nohousing successfully");
    });
  });
});
module.exports = router;
