// require express
const { application } = require('express');
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

router.get('/', (req, res) => {
    const query1 = 'SELECT id, fullname, role, gender, age, graduationyear, major, pet FROM User;'; 	//Or FROM Housing
	const query2 = '';
	const query3 = '';
	db(client => {
		
	});
})

module.exports = router;

/**
var must_have_variables[] = list of must have variables
var values_of_must_have_variables[];
var mysql = require('mysql'); //idk what this does, needed for connection to database
var con = mysql.createConnection({ //Establishes connection to database
	host: "localhost",
	user: "username",
	password: "password",
	database: "BirdNest"
});
con.connect(function(err) { //stores information of user A into userAInfo
 	if (err) throw err;
 	con.query("SELECT * from Housing WHERE userID = userAID", function (err, userAInfo, fields) { //userAID will be provided by front end
    		if (err) throw err;
  });
for(int i = 0; i < userAInfo.length(); i++) { //(RUN TIME: O(n))
	values_of_must_have_variables.add(userAID[0].(must_have_variables[i])); //row -> variable type
} //at this point, values_of_must_have_variables is filled
int index = 0; //the following code increments the value of Matches for each time a match is found per user
for each variable in must_have_variables //(RUN TIME: O(k)) {
	UPDATE Housing SET Matches = Matches + 1 WHERE 'variable = values_of_must_have_variables[index]'; //At this point, the Matches of values in the table that
													  //match the current variable in must_have_variables is
													  //is incremented by 1.
	index = index + 1;						      
}
 */

/**
 * key     value
 * 
 * gynm    true/false
 * pool    true/false
 */