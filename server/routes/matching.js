// require express
const express = require("express");

// require db connection
const db = require("../utils/database");
const router = express.Router();

//Does this consider that neighborhoods are 
router.post('/lookingforhousing', (req, res) => { // input
	let provided_id = req.body.user_id; //temporary until ID is provided by front-end
	//query for sending every user's variables to the front-end 
	const resultQuery = "SELECT User.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY prioritycount desc, number desc";
	db(client => {
		var must_have_map = new Map();
		client.query(`SELECT * FROM BirdNest.Housing WHERE User_id = ${provided_id}`, //replaced NoHousing with MustHave //TODO: Why NoHousing originally (I changed it frmo Nohousing)?
			(err, result) => {
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
				for(const [key, value] of must_have_map) { //updates matches count for each user
					// 1ST RENT LEASE NEIGHBOTHOOD
					if (key == "rent") { //evaluates the lease and rent for a range
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET prioritycount = prioritycount + 1 WHERE ${key} <= ${value}`;
					} 
					else if (key == "neighborhood"){
						const inClause = value.map(el => "'" + el + "'").join();
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} in (${inClause})`;
					}
					else { //evaluates for values that are strings
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} = '${value}'`;	
					}
					client.query(matchingQuery, [],(err) => {
						if (err) console.log("Fail to match");
					});
				}
				client.query(resultQuery, function (err, result) { //orders Matches table from most to least matches
					if (err) console.log("Fail to show result");
					// Output result
					res.send(result);
					// Reset matching table
					const reset = 'UPDATE BirdNest.Matching SET number = 0, prioritycount = 0';
					client.query(reset, (err) => { //resets matches to 0 for all users
						if(err) console.log("Reset fail");
					});
				});
		});
	});
});

//lookingforroommate?
/*
router.post('/lookingfornohousing', (req, res) => { // input
	let provided_id = req.body.user_id; //temporary until ID is provided by front-end
	//query for sending every user's variables to the front-end 
	const resultQuery = "SELECT User.*, Matching.number FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY prioritycount desc, number desc";
	db(client => {
		var must_have_map = new Map();
		client.query(`SELECT * FROM BirdNest.NoHousing WHERE User_id = ${provided_id}`, //replaced NoHousing with MustHave //TODO: Why NoHousing?
			(err, result) => {
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
				for(const [key, value] of must_have_map) { //updates matches count for each user
					// 1ST RENT LEASE NEIGHBOTHOOD
					if (key == "rent") { //evaluates the lease and rent for a range
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.NoHousing ON Matching.User_id = NoHousing.User_id SET prioritycount = prioritycount + 1 WHERE ${key} <= ${value}`;
					} 
					else if (key == "neighborhood"){ 
						const inClause = value.map(el => "'" + el + "'").join();
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.NoHousing ON Matching.User_id = NoHousing.User_id SET number = number + 1 WHERE ${key} in (${inClause})`;
					}
					else { //evaluates for values that are strings
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.NoHousing ON Matching.User_id = NoHousing.User_id SET number = number + 1 WHERE ${key} = '${value}'`;	
					}
					client.query(matchingQuery, [],(err) => {
						if (err) console.log("Fail to match");
					});
				}
				client.query(resultQuery, function (err, result) { //orders Matches table from most to least matches
					if (err) console.log("Fail to show result");
					// Output result
					res.send(result);
					// Reset matching table
					const reset = 'UPDATE BirdNest.Matching SET number = 0, prioritycount = 0';
					client.query(reset, (err) => { //resets matches to 0 for all users
						if(err) console.log("Reset fail");
					});
				});
		});
	});
});
*/
router.post('/filter', (req, res) => {
	//TODO: Sort in order of matching algorithm.
    //neighborhoodList, rent, lease, square feet, parking, gym, pool, appliances, furniture, AC
    //if booleans are false don't filter by them
    //const filterMap = new Map([["gargage", 1], ["parking", 1], ["gym", 1], ["appliances", 1]]); 
    const filterMap = new Map(JSON.parse(req.body.filterMap));
    console.log(filterMap);
	//console.log(filterMap.keys());
	//console.log(filterMap.values());
	//console.log(filterMap.length);
    let housingQuery = "SELECT * FROM Housing JOIN User ON Housing.User_id = User.id JOIN Matching ON Housing.User_id = Matching.User_id WHERE ";
	let nohousingQuery = "SELECT * FROM NoHousing JOIN User ON NoHousing.User_id = User.id JOIN Matching ON NoHousing.User_id = Matching.User_id WHERE ";
    for (var [key, value] of filterMap.entries()) {
		console.log(typeof value + " " + value);
		//console.log(key);
		//console.log(value);
		//console.log("AAAAAAAAAAAAAAAAAAA");
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
module.exports = router;

