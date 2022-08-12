// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

router.post('/', (req, res) => { // input
	var provided_id = 9; //temporary until ID is provided by front-end
	//var provided_id = req.body.id:

	//query for sending every user's variables to the front-end 
	const resultQuery = "SELECT User.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY number desc";
	db(client => {
		var must_have_map = new Map();
		client.query(`SELECT * FROM BirdNest.MustHave WHERE User_id = ${provided_id}`, //replaced NoHousing with MustHave
			(err, result) => {
				const provided_values = result;
				//add the following matching variables to the map
				must_have_map.set("neighborhood", provided_values[0].neighborhood);
				must_have_map.set("city", provided_values[0].city);
				must_have_map.set("lease", provided_values[0].lease);
				must_have_map.set("rent", provided_values[0].rent);
				must_have_map.set("age", provided_values[0].age);
				must_have_map.set("gender", provided_values[0].gender);
				must_have_map.set("pet", provided_values[0].pet);
				must_have_map.set("alcohol", provided_values[0].alcohol);
				must_have_map.set("sleep", provided_values[0].sleep);
				must_have_map.set("guests", provided_values[0].guests);
				must_have_map.set("cleanliness", provided_values[0].cleanliness);
				for(const [key, value] of must_have_map) { //updates matches count for each user
					if (key == "lease" || key == "rent") { //evaluates the lease and rent for a range
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.MustHave ON Matching.User_id = MustHave.User_id SET number = number + 1 WHERE ${key} <= ${value}`;
					} 
					else if(key == "age") { //evaluates for age, whose value is an int
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.MustHave ON Matching.User_id = MustHave.User_id SET number = number + 1 WHERE ${key} = ${value}`;
					}
					else { //evaluates for values that are strings
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.MustHave ON Matching.User_id = MustHave.User_id SET number = number + 1 WHERE ${key} = '${value}'`;	
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
					const reset = 'UPDATE BirdNest.Matching SET number = 0';
					client.query(reset, (err) => { //resets matches to 0 for all users
						if(err) console.log("Reset fail");
					});
				});
		});
	});
});
module.exports = router;
