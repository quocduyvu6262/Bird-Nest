// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

router.get('/', (req, res) => {
	var provided_id = 1; //temporary until ID is provided by front-end
    const query1 = "SELECT * FROM User WHERE id =?"; //gets the values_of_must_have_variables array of provided user
	const query2 = "SELECT * FROM MustHave WHERE id =?"; //finds which variables are the must have variables
	const query3 = "UPDATE Matching SET number = number + 1 WHERE "; //increments matches if a match is found
	const query4 = "SELECT * FROM Matching ORDER BY number"; //orders Matches table by most to least matches
	db(client => {
		var must_have_map = new Map();
		client.query(query1, [provided_id], function (err, provided_values) { //at this point, we have the values of provided user stored in provided_values
			if (err) throw err;
		  });
		var must_have_id = provided_values[0].MustHave_id; //MustHave_id of provided user stored in must_have_id
		var match_id = provided_values[0].Matching_id; //Matching_id of provided user stored in match_id
		client.query(query2, [must_have_id], function (err, must_have_bools) { //at this point, we have the boolean values of must have values
			if (err) throw err;
		  });
		//the following code checks each variable to see whether it is a must have variable or not
		if(must_have_bools[0].city == true) {
			must_have_map.set("city", provided_values[0].city);
		}
		if(must_have_bools[0].address == true) {
			must_have_map.set("address", provided_values[0].address);
		}
		if(must_have_bools[0].squarefeet == true) {
			must_have_map.set("squarefeet", provided_values[0].squarefeet);
		}
		if(must_have_bools[0].lease == true) {
			must_have_map.set("lease", provided_values[0].lease);
		}
		if(must_have_bools[0].rent == true) {
			must_have_map.set("rent", provided_values[0].rent);
		}
		if(must_have_bools[0].gargage == true) {
			must_have_map.set("gargage", provided_values[0].gargage);
		}
		if(must_have_bools[0].parking == true) {
			must_have_map.set("parking", provided_values[0].parking);
		}
		if(must_have_bools[0].gym == true) {
			must_have_map.set("gym", provided_values[0].gym);
		}
		if(must_have_bools[0].pool == true) {
			must_have_map.set("pool", provided_values[0].pool);
		}
		if(must_have_bools[0].appliances == true) {
			must_have_map.set("appliances", provided_values[0].appliances);
		}
		if(must_have_bools[0].furniture == true) {
			must_have_map.set("furniture", provided_values[0].furniture);
		}
		//must have values have been added to must_have_map
		for(var entry in must_have_map.entries()) { //updates matches count for each user
			var key = entry[0];
			var value = String(entry[1]);
			const query3_final = query3 + key + " =?";
			client.query(query3_final, [value], function (err, result) {
				if (err) throw err;
			  });
		}
		client.query(query4, function (err, ordered_matches) { //orders Matches table from most to least matches
			if (err) throw err;
		  });
	});
})

module.exports = router;
