// require express
const express = require("express");
// require db connection
const db = require("../utils/database");
const router = express.Router();
const priorityQueue = require('../utils/priorityQueue');


router.post('/lookingforhousing', (req, res) => { // input
	let provided_id = req.body.user_id; //temporary until ID is provided by front-end
	priorityQueue.clear();
	//query for sending every user's variables to the front-end 
	const getHousingQuery = "SELECT User.*, Housing.* FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id";
	db(client => {
		var must_have_map = new Map();
		client.query(`SELECT * FROM BirdNest.NoHousing WHERE User_id = ${provided_id}`, //replaced NoHousing with MustHave
			(err, result) => {
				if(err) throw err;
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
					if(err) throw err;
					const housings = result;
					housings.forEach(housing => {
						let priorityCount = 0;
						let count = 0;
						for(const [key, value] of must_have_map){
							if(key == 'rent' && housing[key] <= value){
								priorityCount += 1;
							} else if(key == 'neighborhood' && value.includes(housing.neighborhood)){
								count += 1;
							} else if(value == housing[key]) {
								count += 1;
							}
						}
						priorityQueue.push({
							info: housing,
							priorityCount: priorityCount,
							count: count
						})
					});
					res.send(priorityQueue.toArray());
				});
		});
	});
});

router.post('/lookingfornohousing', (req, res) => { // input
	let provided_id = req.body.user_id; //temporary until ID is provided by front-end
	priorityQueue.clear();
	//query for sending every user's variables to the front-end 
	const getNoHousingQuery = "SELECT User.*, NoHousing.* FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id";
	db(client => {
		var must_have_map = new Map();
		client.query(`SELECT * FROM BirdNest.Housing WHERE User_id = ${provided_id}`, //replaced NoHousing with MustHave
			(err, result) => {
				if(err) throw err;
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
					if(err) throw err;
					const housings = result;
					housings.forEach(housing => {
						let priorityCount = 0;
						let count = 0;
						for(const [key, value] of must_have_map){
							if(key == 'rent' && housing[key] >= value){
								priorityCount += 1;
							} else if(key == 'neighborhood' && housing.neighborhood.includes(value)){
								count += 1;
							} else if(value == housing[key]) {
								count += 1;
							}
						}
						priorityQueue.push({
							info: housing,
							priorityCount: priorityCount,
							count: count
						})
					});
					res.send(priorityQueue.toArray());
				});
		});
	});
});

module.exports = router;

