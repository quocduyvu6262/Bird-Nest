// require express
const express = require("express");

// require db connection
const db = require("../utils/database");
const router = express.Router();

router.post("/", (req, res) => {
  // input
  var provided_id = 11; //temporary until ID is provided by front-end
  //var provided_id = req.body.id:

  const resultQuery =
    "SELECT User.fullname, User.email, User.role, User.gender, User.age, User.graduationyear, User.major, User.pet, User.bio, User.status, User.profilepic, Housing.*, Matching.number, Matching.prioritycount FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY prioritycount desc, number desc"; //orders Matches table by most to least matches
  db((client) => {
    var must_have_map = new Map();
    client.query(
      `SELECT NoHousing.* from BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id WHERE User.id = ${provided_id}`,
      (err, result) => {
        const provided_values = result;
        // iterate through variables and update matching
        must_have_map.set("squarefeet", provided_values[0].squarefeet);
        must_have_map.set("lease", provided_values[0].lease);
        must_have_map.set("rent", provided_values[0].rent);
        must_have_map.set("gargage", provided_values[0].gargage);
        must_have_map.set("parking", provided_values[0].parking);
        must_have_map.set("gym", provided_values[0].gym);
        must_have_map.set("pool", provided_values[0].pool);
        must_have_map.set("appliances", provided_values[0].appliances);
        must_have_map.set("furniture", provided_values[0].furniture);
        for (const [key, value] of must_have_map) {
          //updates matches count for each user
          if (key == "rent") {
            var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET prioritycount = prioritycount + 1 WHERE ${key} <= ${value}`;
          } else if (key == "squarefeet" || key == "lease") {
            var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} <= ${value}`;
          } else {
            var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} = ${value}`;
          }
          client.query(matchingQuery, [], (err, result) => {
            if (err) throw err;
          });
        }
        client.query(resultQuery, function (err, result) {
          //orders Matches table from most to least matches
          if (err) throw err;
          // Output result
          res.send(result);
          // Reset matching table
          const reset =
            "UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = 0, prioritycount = 0";
          client.query(reset, (err, result) => {
            if (err) throw err;
          });
        });
      }
    );
  });
});

router.get("/reset", (req, res) => {
  db((client) => {
    const reset =
      "UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = 0";
    client.query(reset, (err, result) => {
      if (err) throw err;
    });
  });
});

router.post("/filtered", (req, res) => {
  //const filterVars = ["id", "fullname", "role", "gender", "age", "graduationyear", "major", "pet"];
  //
  //const filterMap = new Map([["gargage", 1], ["parking", 1], ["gym", 1], ["appliances", 1]]);
  const filterMap = req.body;
  console.log(filterMap);

  // ----START OF DEONDRE'S CODE CHANGES----

  // ORIGINAL CODE BELOW
  //   let incompleteQuery = "SELECT * ";

  // ALTERATIONS BELOW

  let incompleteQuery = "SELECT Housing.*, User.fullname ";

  // ----END OF DEONDRE'S CODE CHANGES----

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

  // ----START OF DEONDRE'S CODE CHANGES----

  // ORIGINAL CODE BELOW
  //   incompleteQuery += "FROM Housing WHERE ";

  // ALTERATIONS BELOW
  incompleteQuery +=
    "FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id WHERE ";

  // ----END OF DEONDRE'S CODE CHANGES----

  /*
	  filterMap.forEach(function(value, key) {
		  incompleteQuery += key + "=" + value.toString() + " AND ";
	  })
	  */

  for (let key in filterMap) {
    incompleteQuery += key + "=" + filterMap[key].toString() + " AND ";
  }

  incompleteQuery = incompleteQuery.slice(0, incompleteQuery.length - 4);
  incompleteQuery += ";";
  //SELECT filtervars FROM User WHERE filtervars = values;
  //const filterVars = [];
  //filterVars.push(var);

  //for (let i = 0; i < filterVars.length -1; i++) {    //skip last element because last doesnt have comma
  //    incompleteQuery += filterVars[i] + ", ";
  //}
  //incompleteQuery += filterVars[filterVars.length -1] + " FROM User;";
  //const query = "SELECT id, fullname, role, gender, age, graduationyear, major, pet FROM User WHERE id=5;";
  console.log(incompleteQuery);
  const query = incompleteQuery;
  db((client) => {
    client.query(query, (err, results) => {
      if (!err) {
        console.log(results);
        res.send(results);
      } else {
        //res.status(401).send("No users matching those filters found");
        console.log(err);
        console.log(query);
        console.log(filterMap);
        res.status(401).send(results);
      }
    });
  });
});

module.exports = router;
