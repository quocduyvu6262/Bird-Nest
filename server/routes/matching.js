// require express
const express = require("express");
// require db connection
const db = require("../utils/database");
const router = express.Router();
const priorityQueue = require("../utils/priorityQueue");

router.post("/lookingforhousing", (req, res) => {
  // input
  let provided_id = req.body.user_id; //temporary until ID is provided by front-end
  priorityQueue.clear();
  //query for sending every user's variables to the front-end
  const getHousingQuery =
    "SELECT User.*, Housing.* FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id";
  console.log(getHousingQuery);
  console.log(provided_id);
  db((client) => {
    var must_have_map = new Map();
    client.query(
      `SELECT * FROM BirdNest.NoHousing WHERE User_id = ${provided_id}`, //replaced NoHousing with MustHave
      (err, result) => {
        if (err) throw err;
        const provided_values = result;
        //add the following matching variables to the map
        must_have_map.set("neighborhood", provided_values[0].neighborhood); // array of string
        must_have_map.set("lease", provided_values[0].lease);
        must_have_map.set("rent", provided_values[0].rent);
        must_have_map.set("squarefeet", provided_values[0].squarefeet);
        must_have_map.set("parking", provided_values[0].parking);
        must_have_map.set("gym", provided_values[0].gym);
        must_have_map.set("pool", provided_values[0].pool);
        must_have_map.set("appliances", provided_values[0].appliances);
        must_have_map.set("furniture", provided_values[0].furniture);
        must_have_map.set("AC", provided_values[0].AC);
        client.query(getHousingQuery, (err, result) => {
          if (err) throw err;
          const housings = result;
          housings.forEach((housing) => {
            let priorityCount = 0;
            let count = 0;
            for (const [key, value] of must_have_map) {
              if (key == "rent" && housing[key] <= value) {
                priorityCount += 1;
              } else if (
                key == "neighborhood" &&
                value.includes(housing.neighborhood)
              ) {
                count += 1;
              } else if (value == housing[key]) {
                count += 1;
              }
            }
            priorityQueue.push({
              info: housing,
              priorityCount: priorityCount,
              count: count,
            });
          });
          res.send(priorityQueue.toArray());
        });
      }
    );
  });
});

router.post("/lookingfornohousing", (req, res) => {
  // input
  let provided_id = req.body.user_id; //temporary until ID is provided by front-end
  priorityQueue.clear();
  //query for sending every user's variables to the front-end
  const getNoHousingQuery =
    "SELECT User.*, NoHousing.* FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id";
  db((client) => {
    var must_have_map = new Map();
    client.query(
      `SELECT * FROM BirdNest.Housing WHERE User_id = ${provided_id}`, //replaced NoHousing with MustHave
      (err, result) => {
        if (err) throw err;
        const provided_values = result;
        //add the following matching variables to the map
        must_have_map.set("neighborhood", provided_values[0].neighborhood);
        must_have_map.set("lease", provided_values[0].lease);
        must_have_map.set("rent", provided_values[0].rent);
        must_have_map.set("squarefeet", provided_values[0].squarefeet);
        must_have_map.set("parking", provided_values[0].parking);
        must_have_map.set("gym", provided_values[0].gym);
        must_have_map.set("pool", provided_values[0].pool);
        must_have_map.set("appliances", provided_values[0].appliances);
        must_have_map.set("furniture", provided_values[0].furniture);
        must_have_map.set("AC", provided_values[0].AC);
        client.query(getNoHousingQuery, (err, result) => {
          if (err) throw err;
          const housings = result;
          housings.forEach((housing) => {
            let priorityCount = 0;
            let count = 0;
            for (const [key, value] of must_have_map) {
              if (key == "rent" && housing[key] >= value) {
                priorityCount += 1;
              } else if (
                key == "neighborhood" &&
                housing.neighborhood.includes(value)
              ) {
                count += 1;
              } else if (value == housing[key]) {
                count += 1;
              }
            }
            priorityQueue.push({
              info: housing,
              priorityCount: priorityCount,
              count: count,
            });
          });
          res.send(priorityQueue.toArray());
        });
      }
    );
  });
});

//Filter the results of Flamingo, Owl seeing Parrot, Penguin, Duck (Nohousing table). Uses lookingfornohousing (NoHousing)
//Rent is >= (People with housing looking for nohousing willing to pay at least that amount)
router.post("/filternohousingtable", (req, res) => {
  let provided_id = req.body.user_id;
  priorityQueue.clear();
  //TODO: Sort in order of matching algorithm.
  const filterMap = new Map(JSON.parse(req.body.filterMap));
  //Query to get all other users in NoHousing
  let nohousingQuery =
    "SELECT * FROM NoHousing JOIN User ON NoHousing.User_id = User.id WHERE ";
  //BUILD FILTER QUERY
  for (var [key, value] of filterMap.entries()) {
    //skip unselected switches
    if (value == 0 || false) {
      continue;
    } else if (value == true) {
      nohousingQuery += key + "=" + value.toString() + " AND ";
    }
<<<<<<< HEAD
    //rent has to be >=
    else if (key == "rent") {
      nohousingQuery += key + ">=" + value.toString() + " AND ";
    } else if (key == "squarefeet") {
      nohousingQuery += key + ">=" + value.toString() + " AND ";
    } else if (key == "neighborhood" && value.length) {
      nohousingQuery += "(";
      for (let i = 0; i < value.length; i++) {
        nohousingQuery +=
          key + " LIKE " + `"%${value[i].toString()}%"` + " OR ";
      }
      //remove extra OR
      nohousingQuery =
        nohousingQuery.slice(0, nohousingQuery.length - 3) + ") AND ";
    } else {
      nohousingQuery += key + "=" + `"${value.toString()}"` + " AND ";
    }
  }
  //remove extra AND
  let filterQuery = nohousingQuery.slice(0, nohousingQuery.length - 4) + ";";
  console.log(filterQuery);
=======
	//remove extra AND
	let filterQuery = nohousingQuery.slice(0, nohousingQuery.length -4) + ";";
	//if everything deselected
	if (filterQuery === "SELECT * FROM NoHousing JOIN User ON NoHousing.User_id = User.id WHERE ;") {
		filterQuery = "SELECT * FROM NoHousing JOIN User ON NoHousing.User_id = User.id";
	}
	
	console.log(filterQuery);
>>>>>>> alm011-copy

  //GET PRIORITY COUNT
  db((client) => {
    client.query(filterQuery, (err, filterResult) => {
      //If result, use priorityCount on that
      if (!err && filterResult.length) {
        var must_have_map = new Map();
        //Gets current user's housing data
        client.query(
          `SELECT * FROM BirdNest.Housing WHERE User_id = ${provided_id}`,
          (err, result) => {
            if (err) throw err;
            const user_values = result;
            //add the following matching variables to the map
            must_have_map.set("neighborhood", user_values[0].neighborhood); // array of string
            must_have_map.set("lease", user_values[0].lease);
            must_have_map.set("rent", user_values[0].rent);
            must_have_map.set("squarefeet", user_values[0].squarefeet);
            must_have_map.set("parking", user_values[0].parking);
            must_have_map.set("gym", user_values[0].gym);
            must_have_map.set("pool", user_values[0].pool);
            must_have_map.set("appliances", user_values[0].appliances);
            must_have_map.set("furniture", user_values[0].furniture);
            must_have_map.set("AC", user_values[0].AC);
            const nohousings = filterResult;
            nohousings.forEach((nohousing) => {
              let priorityCount = 0;
              let count = 0;
              for (const [key, value] of must_have_map) {
                if (key == "rent" && nohousing[key] >= value) {
                  priorityCount += 1;
                } else if (
                  key == "neighborhood" &&
                  nohousing.neighborhood.includes(value)
                ) {
                  count += 1;
                } else if (value == nohousing[key]) {
                  count += 1;
                }
              }
              priorityQueue.push({
                info: nohousing,
                priorityCount: priorityCount,
                count: count,
              });
            });
            res.send(priorityQueue.toArray());
          }
        );
      } else {
        res.status(401).send("No users matching those filters found");
        console.log(err);
      }
    });
  });
});

//Filter the results of Parrot, Penguin, Duck seeing Flamingo, Owl (Housing table). Uses lookingforhousing (Housing)
//Rent is <= (People without housing looking for housing at most at that price)
router.post("/filterhousingtable", (req, res) => {
  let provided_id = req.body.user_id;
  priorityQueue.clear();
  //TODO: Sort in order of matching algorithm.
  const filterMap = new Map(JSON.parse(req.body.filterMap));
  //Query to get all other users in NoHousing
  let housingQuery =
    "SELECT * FROM Housing JOIN User ON Housing.User_id = User.id WHERE ";
  //BUILD FILTER QUERY
  for (var [key, value] of filterMap.entries()) {
    //skip unselected switches
    if (value == 0 || false) {
      continue;
    } else if (value == true) {
      housingQuery += key + "=" + value.toString() + " AND ";
    }
<<<<<<< HEAD
    //rent has to be <=
    else if (key == "rent") {
      housingQuery += key + "<=" + value.toString() + " AND ";
    } else if (key == "squarefeet") {
      housingQuery += key + ">=" + value.toString() + " AND ";
    } else if (key == "neighborhood" && value.length) {
      housingQuery += "(";
      for (let i = 0; i < value.length; i++) {
        housingQuery += key + " LIKE " + `"%${value[i].toString()}%"` + " OR ";
      }
      //remove extra OR
      housingQuery = housingQuery.slice(0, housingQuery.length - 3) + ") AND ";
    } else {
      housingQuery += key + "=" + `"${value.toString()}"` + " AND ";
    }
  }
  //remove extra AND
  let filterQuery = housingQuery.slice(0, housingQuery.length - 4) + ";";
  console.log(filterQuery);
=======
	//remove extra AND
	let filterQuery = housingQuery.slice(0, housingQuery.length -4) + ";";
	//if everything deselected
	if (filterQuery === "SELECT * FROM NoHousing JOIN User ON NoHousing.User_id = User.id WHERE ;") {
		filterQuery = "SELECT * FROM NoHousing JOIN User ON NoHousing.User_id = User.id";
	}
	console.log(filterQuery);
>>>>>>> alm011-copy

  //GET PRIORITY COUNT
  db((client) => {
    client.query(filterQuery, (err, filterResult) => {
      //If result, use priorityCount on that
      if (!err && filterResult.length) {
        var must_have_map = new Map();
        //Gets current user's housing data
        client.query(
          `SELECT * FROM BirdNest.NoHousing WHERE User_id = ${provided_id}`,
          (err, result) => {
            if (err) throw err;
            const user_values = result;
            //add the following matching variables to the map
            must_have_map.set("neighborhood", user_values[0].neighborhood); // array of string
            must_have_map.set("lease", user_values[0].lease);
            must_have_map.set("rent", user_values[0].rent);
            must_have_map.set("squarefeet", user_values[0].squarefeet);
            must_have_map.set("parking", user_values[0].parking);
            must_have_map.set("gym", user_values[0].gym);
            must_have_map.set("pool", user_values[0].pool);
            must_have_map.set("appliances", user_values[0].appliances);
            must_have_map.set("furniture", user_values[0].furniture);
            must_have_map.set("AC", user_values[0].AC);
            const housings = filterResult;
            housings.forEach((housing) => {
              let priorityCount = 0;
              let count = 0;
              for (const [key, value] of must_have_map) {
                if (key == "rent" && housing[key] <= value) {
                  priorityCount += 1;
                } else if (
                  key == "neighborhood" &&
                  value.includes(housing.neighborhood)
                ) {
                  count += 1;
                } else if (value == housing[key]) {
                  count += 1;
                }
              }
              priorityQueue.push({
                info: housing,
                priorityCount: priorityCount,
                count: count,
              });
            });
            res.send(priorityQueue.toArray());
          }
        );
      } else {
        res.status(401).send("No users matching those filters found");
        console.log(err);
      }
    });
  });
});

//Housing and NoHousing
/*
router.post('/filterall', (req, res) => {
	priorityQueue.clear();
	//TODO: Sort in order of matching algorithm.
    //neighborhoodList, rent, lease, square feet, parking, gym, pool, appliances, furniture, AC
    //if booleans are false don't filter by them
    //const filterMap = new Map([["gargage", 1], ["parking", 1], ["gym", 1], ["appliances", 1]]); 
    const filterMap = new Map(JSON.parse(req.body.filterMap));
    let housingQuery = "SELECT id, address, neighborhood, lease, rent, squarefeet, garage, parking, gym, pool, appliances, furniture, AC, User_id FROM Housing JOIN User ON Housing.User_id = User.id JOIN Matching ON Housing.User_id = Matching.User_id WHERE ";
	let nohousingQuery = "SELECT * FROM NoHousing JOIN User ON NoHousing.User_id = User.id JOIN Matching ON NoHousing.User_id = Matching.User_id WHERE ";
    for (var [key, value] of filterMap.entries()) {
		//skip unselected switches
		if (value == 0 || false) { //0 or false
			continue;
		}
		else if (value == true) {
			housingQuery += key + "=" + value.toString() + " AND ";
			nohousingQuery += key + "=" + value.toString() + " AND ";
		}
		//rent has to be <= 
		else if (key == "rent"){
			housingQuery += key + "<=" + value.toString() + " AND ";
			nohousingQuery += key + "<=" + value.toString() + " AND ";
		}
		else if (key == "squarefeet"){
			housingQuery += key + ">=" + value.toString() + " AND ";
			nohousingQuery += key + ">=" + value.toString() + " AND ";
		}
		else if ((key == "neighborhood") && (value.length)) {
			console.log(value);
			//let neighborhoodList = value;
			for (let i = 0; i < value.length; i++) {
				housingQuery += key + " LIKE " + `"${value[i].toString()}"` + " OR ";
				nohousingQuery += key + " LIKE " + `"${value[i].toString()}"` + " OR ";
			}
			//remove extra OR
			housingQuery = housingQuery.slice(0, housingQuery.length -3);
			nohousingQuery = nohousingQuery.slice(0, nohousingQuery.length -3);
			housingQuery += "AND ";
			nohousingQuery += "AND "
		}
		else {
			housingQuery += key + "=" + `"${value.toString()}"` + " AND ";
			nohousingQuery += key + "=" + `"${value.toString()}"` + " AND ";
		}
    }
	//remove extra AND
    housingQuery = housingQuery.slice(0, housingQuery.length -4);
	nohousingQuery = nohousingQuery.slice(0, nohousingQuery.length -4);
    //const query = "SELECT id, fullname, role, gender, age, graduationyear, major, pet FROM User WHERE id=5;";
    let query = housingQuery + " UNION " + nohousingQuery + " ORDER BY prioritycount DESC;";
	//	sort by priority count
	//reset priority count
    console.log(query);
    db(client => {
        client.query(query, (err, results) => {
            if(!err && results.length){
                res.send(results);
				//console.log(priorityCount);
            } else {
                //res.status(401).send("No users matching those filters found");
                console.log(err);
                console.log(query);
                //console.log(filterMap);
                res.status(401).send(err);
            }
        })
    });
})
*/
module.exports = router;
