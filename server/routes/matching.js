// require express
const express = require("express");

// require db connection
const db = require("../utils/database");
const router = express.Router();

router.post('/lookingforhousing', (req, res) => { // input
	let provided_id = req.body.user_id; //temporary until ID is provided by front-end
	//var provided_id = req.body.id:
	console.log(provided_id)
	//query for sending every user's variables to the front-end 
	const resultQuery = "SELECT User.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id ORDER BY number desc";
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
						var matchingQuery = `UPDATE BirdNest.Matching JOIN BirdNest.Housing ON Matching.User_id = Housing.User_id SET number = number + 1 WHERE ${key} <= ${value}`;
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
					const reset = 'UPDATE BirdNest.Matching SET number = 0';
					client.query(reset, (err) => { //resets matches to 0 for all users
						if(err) console.log("Reset fail");
					});
				});
		});
	});
});

router.post('/filter', (req, res) => {
    //neighborhoodList, rent, lease, square feet, parking, gym, pool, appliances, furniture, AC
    //if booleans are false don't filter by them
    //const filterMap = new Map([["gargage", 1], ["parking", 1], ["gym", 1], ["appliances", 1]]); 
    const filterMap = req.body;
    console.log(filterMap);
    let housingQuery = "SELECT * FROM Housing WHERE ";
	let nohousingQuery = "SELECT * FROM NoHousing WHERE ";
    for (let key in filterMap) {
		//skip unselected switches
		if (filterMap[key] === "false") {
			continue;
		}
		//rent has to be <= 
		if (key === "rent"){
			housingQuery += key + "<=" + filterMap[key].toString() + " AND ";
			nohousingQuery += key + "<=" + filterMap[key].toString() + " AND ";
		}
		else {
			housingQuery += key + "=" + filterMap[key].toString() + " AND ";
			nohousingQuery += key + "=" + filterMap[key].toString() + " AND ";
		}
    }
    housingQuery = housingQuery.slice(0, housingQuery.length -4);
	nohousingQuery = nohousingQuery.slice(0, nohousingQuery.length -4);
    //const query = "SELECT id, fullname, role, gender, age, graduationyear, major, pet FROM User WHERE id=5;";
    let query = housingQuery + " UNION " + nohousingQuery + ";";
    console.log(query);
    db(client => {
        client.query(query, (err, results) => {
            if(!err){
                res.send(results);
            } else {
                //res.status(401).send("No users matching those filters found");
                console.log(err);
                console.log(query);
                console.log(filterMap);
                res.status(401).send(results);
            }
        })
    });
})
module.exports = router;

