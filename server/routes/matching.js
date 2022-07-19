// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

router.post('/', (req, res) => { // input
	var provided_id = 11; //temporary until ID is provided by front-end
	//var provided_id = req.body.id:


	const resultQuery = "SELECT User.fullname, User.email, User.role, User.gender, User.age, User.graduationyear, User.major, User.pet, User.bio, User.status, User.profilepic, Housing.*, Matching.number, Matching.prioritycount FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY prioritycount desc, number desc"; //orders Matches table by most to least matches
	db(client => {
		var must_have_map = new Map();
		client.query(`SELECT NoHousing.* from BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id WHERE User.id = ${provided_id}`,
			(err, result) => {
				const provided_values = result;
				// iterate through variables and update matching
				must_have_map.set("squarefeet", provided_values[0].squarefeet);
				must_have_map.set("lease", provided_values[0].lease);
				must_have_map.set("rent", provided_values[0].rent);
				must_have_map.set("garage", provided_values[0].garage);
				must_have_map.set("parking", provided_values[0].parking);
				must_have_map.set("gym", provided_values[0].gym);
				must_have_map.set("pool", provided_values[0].pool);
				must_have_map.set("appliances", provided_values[0].appliances);
				must_have_map.set("furniture", provided_values[0].furniture);
				for(const [key, value] of must_have_map) { //updates matches count for each user
					if(key == "rent"){
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET prioritycount = prioritycount + 1 WHERE ${key} <= ${value}`;
					} else if (key == "squarefeet" || key == "lease" ) {
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} <= ${value}`;
					} else {
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} = ${value}`;	
					}
					client.query(matchingQuery, [],(err, result) => {
						if (err) throw err;
					});
				}
				client.query(resultQuery, function (err, result) { //orders Matches table from most to least matches
					if (err) throw err;
					// Output result
					res.send(result);
					// Reset matching table
					const reset = 'UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = 0, prioritycount = 0';
					client.query(reset, (err, result) => {
						if(err) throw err;
					});
				});
		});
	});
});

// router.post('/', (req, res) => { // input
// 	var provided_id = 11; //temporary until ID is provided by front-end
// 	//var provided_id = req.body.id:


// 	const resultQuery = "SELECT User.fullname, User.email, User.role, User.gender, User.age, User.graduationyear, User.major, User.pet, User.bio, User.status, User.profilepic, Housing.*, Matching.number, Matching.prioritycount FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY prioritycount desc, number desc"; //orders Matches table by most to least matches
// 	db(client => {
// 		var must_have_map = new Map();
// 		// iterate through variables and update matching
// 		if(req.body.squarefeet != null) must_have_map.set("squarefeet", req.body.squarefeet);
// 		if(req.body.lease != null) must_have_map.set("lease", req.body.lease);
// 		if(req.body.rent != null) must_have_map.set("rent", req.body.rent);
// 		if(req.body.garage != null) must_have_map.set("garage", req.body.garage);
// 		if(req.body.parking != null) must_have_map.set("parking", req.body.parking);
// 		if(req.body.gym != null) must_have_map.set("gym", req.body.gym);
// 		if(req.body.pool != null) must_have_map.set("pool", req.body.pool);
// 		if(req.body.appliances != null) must_have_map.set("appliances", req.body.appliances);
// 		if(req.body.furniture != null) must_have_map.set("furniture", req.body.furniture);
// 		console.log(must_have_map);
// 		for(const [key, value] of must_have_map) { //updates matches count for each user
// 			console.log(key);
// 			console.log(value);
// 			if(key == "rent"){
// 				var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET prioritycount = prioritycount + 1 WHERE ${key} <= ${value}`;
// 			} else if (key == "squarefeet" || key == "lease" ) {
// 				var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} <= ${value}`;
// 			} else {
// 				var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} = ${value}`;	
// 			}
// 			client.query(matchingQuery, [],(err, result) => {
// 				if (err) throw err;
// 			});
// 		}
// 		client.query(resultQuery, function (err, result) { //orders Matches table from most to least matches
// 			if (err) throw err;
// 			// Output result
// 			res.send(result);
// 			// Reset matching table
// 			const reset = 'UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = 0, prioritycount = 0';
// 			client.query(reset, (err, result) => {
// 				if(err) throw err;
// 			});
// 		});
// 	});
// });

router.get('/reset', (req, res) => {
	db(client => {
		const reset = 'UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = 0';
		client.query(reset, (err, result) => {
			if(err) throw err;
		});
	})
});

module.exports = router;
