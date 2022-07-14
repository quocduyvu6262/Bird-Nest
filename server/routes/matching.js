// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

router.post('/', (req, res) => { // input
	var provided_id = 10; //temporary until ID is provided by front-end
	const resultQuery = "SELECT User.fullname, User.email, User.role, User.gender, User.age, User.graduationyear, User.major, User.pet, User.bio, User.status, User.profilepic, Housing.* FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY number desc"; //orders Matches table by most to least matches
	db(client => {
		var must_have_map = new Map();
		client.query(`SELECT NoHousing.* from BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id WHERE User.id = ${provided_id}`,
			(err, result) => {
				const provided_values = result[0];
				// iterate through variables and update matching
				for(let key in provided_values) { //updates matches count for each user
					if(key == "address" || key == "rent" || key == "lease"){
						var matchingQuery = "UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ? <= ?";
					} else {
						var matchingQuery = "UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ? = ?";
					}
					client.query(matchingQuery, [key.toString(), provided_values[key].toString()],(err, result) => {
						if (err) throw err;
					});
				}
				client.query(resultQuery, function (err, result) { //orders Matches table from most to least matches
					if (err) throw err;
					// Output result
					res.send(result);
					// Reset matching table
					const reset = 'UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = 0';
					client.query(reset, (err, result) => {
						if(err) throw err;
					});
				});
		});
	});
})

module.exports = router;
