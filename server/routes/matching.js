// require express
const express = require("express");

// require db connection
const db = require("../utils/database");
const router = express.Router();

router.post('/lookingforhousing', (req, res) => { // input
	let provided_id = req.body.user_id; //temporary until ID is provided by front-end
	//query for sending every user's variables to the front-end 
	const resultQuery = "SELECT User.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY prioritycount desc, number desc";
	db(client => {
		var must_have_map = new Map();
		client.query(`SELECT * FROM BirdNest.NoHousing WHERE User_id = ${provided_id}`, //replaced NoHousing with MustHave
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

router.post('/lookingfornohousing', (req, res) => {
	let provided_id = req.body.user_id;
	//query for sending every user's variables to the front-end 
	const resultQuery = "SELECT User.*, Matching.number FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY prioritycount desc, number desc";
	db(client => {
		var must_have_map = new Map();
		client.query(`SELECT * FROM BirdNest.Housing WHERE User_id = ${provided_id}`, 
			(err, result) => {
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
				for (const [key, value] of must_have_map) { //updates matches count for each user
					// 1ST RENT LEASE NEIGHBOTHOOD
					if (key == "rent") { //evaluates the lease and rent for a range
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.NoHousing ON Matching.User_id = NoHousing.User_id SET prioritycount = prioritycount + 1 WHERE ${key} >= ${value}`;
					} 
					else if (key == "neighborhood"){
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.NoHousing ON Matching.User_id = NoHousing.User_id SET number = number + 1 WHERE JSON_CONTAINS(${key}, '"${value}"', '$')`;
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
			}
			
		)
	})
});

module.exports = router;

