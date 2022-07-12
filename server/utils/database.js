const mysqlssh = require('mysql2-ssh');
const fs = require('fs');
const {sshConfig, dbConfig} = require('./tunnelConfig');

const db = async (query, handleQuery) => {
    await mysqlssh.connect(
        sshConfig, dbConfig
    )
    .then(client => {
        client.query(query, handleQuery);
        
    })
    .catch(err => {
        console.log(err)
    })
}


const db_matching = async (query1, query2, query3, handleQuery) => {
    await mysqlssh.connect(
        sshConfig, dbConfig
    )
    .then(client => {
        // execute algorithm
        



        // end
    })
    .catch(err => {
        console.log(err)
    })
}
module.exports = db;

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