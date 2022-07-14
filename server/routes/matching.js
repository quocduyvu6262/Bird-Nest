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
		var must_have_bools;
		client.query(`SELECT NoHousing.* from BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id WHERE User.id = ${provided_id}`,
			(err, result) => {
				const provided_values = result;
				client.query(
					`SELECT MustHave.*, User.* from BirdNest.User JOIN BirdNest.MustHave ON User.id = MustHave.User_id JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id WHERE User.id = ${provided_id}`, 
					(err, result) => { //at this point, we have the boolean values of must have values
					
					if (err) throw err;
					must_have_bools = result;
					//the following code checks each variable to see whether it is a must have variable or not
					// if(must_have_bools[0].squarefeet == 1) {
					// 	must_have_map.set("squarefeet", provided_values[0].squarefeet);
					// }
					// if(must_have_bools[0].lease == 1) {
					// 	must_have_map.set("lease", provided_values[0].lease);
					// }
					// if(must_have_bools[0].rent == 1) {
					// 	must_have_map.set("rent", provided_values[0].rent);
					// }
					if(must_have_bools[0].gargage == 1) {
						must_have_map.set("gargage", provided_values[0].gargage);
					}
					if(must_have_bools[0].parking == 1) {
						must_have_map.set("parking", provided_values[0].parking);
					}
					if(must_have_bools[0].gym == 1) {
						must_have_map.set("gym", provided_values[0].gym);
					}
					if(must_have_bools[0].pool == 1) {
						must_have_map.set("pool", provided_values[0].pool);
					}
					if(must_have_bools[0].appliances == 1) {
						must_have_map.set("appliances", provided_values[0].appliances);
					}
					if(must_have_bools[0].furniture == 1) {
						must_have_map.set("furniture", provided_values[0].furniture);
					}
					//must have values have been added to must_have_map
					for(const [key,value] of must_have_map) { //updates matches count for each user
						var query3 = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} = ${value}`;
						client.query(query3, function (err, result) {
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
	});
})

module.exports = router;
