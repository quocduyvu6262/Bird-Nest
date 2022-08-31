// require express
const express = require("express");
// require db connection
const db = require("../utils/database");
const router = express.Router();

router.post('/housingrole', (req, res) => {
    let userInfo = req.body.userInfo;
    let housing = req.body.housing;
    let user_id = req.body.user_id;
    // Store user into database
    let userQuery = "UPDATE User SET ";
    for (let key in userInfo) {
        //Possible edge case this creates: What if you want to deselect something optional and make it null? (BANDAID FIX)
        //TODO: Handle boolean/yes/no?
        if (userInfo[key] === null || userInfo[key] === "undefined" || userInfo[key] === '' || key.includes('noti') || key === 'isMatch') {
            continue;
        } 
        else if (key === "email" || key === "userInfo") {
            continue;
        }
        else if (key === "pets" || key === "dayout" || key === "interiorDesign" || key === "favoriteSport" || key === "picsList" || key === 'matchedChat') {
            userQuery += key + "=" + JSON.stringify(JSON.stringify(userInfo[key])) + ","; 
        }
        else if (userInfo[key] === false || userInfo[key] === true) {
            userQuery += key + "=" + `${userInfo[key].toString()}` + ",";
        }
        //Arrays not sending properly 
        else {
            userQuery += key + "=" + `"${userInfo[key].toString()}"` + ",";
        }
    }
    //UPDATE User Set role=... tellRoommateIfBothered=tellRoommateIfBothered, 
    userQuery = userQuery.slice(0, -1);
    //UPDATE User Set role=... tellRoommateIfBothered=tellRoommateIfBothered
    userQuery += ` WHERE email = '${userInfo.email}';`

    // Store user into history table
    const historyQuery = `INSERT IGNORE INTO BirdNest.History (list_of_users_all, list_of_users_yes, list_of_users_no, User_id) 
                      VALUES (null, null, null, ${user_id});`;

    // Delete user from nohousing
    const deleteQuery = `DELETE FROM NoHousing WHERE User_id=${user_id};`;

    // Store housing into database
    const updateOrInsertIfNotExistQuery = `REPLACE INTO 
    Housing(neighborhood, squarefeet, lease, 
          rent, garage, parking, gym, pool, 
          appliances, furniture, AC, User_id)
    VALUES ("${housing.neighborhood}",
    "${housing.squarefeet}", "${housing.lease}", "${housing.rent}", 
    ${housing.garage}, ${housing.parking}, 
    ${housing.gym}, ${housing.pool}, 
    ${housing.appliances}, ${housing.furniture}, ${housing.AC}, "${user_id}");`;

    const query = userQuery + deleteQuery + historyQuery + updateOrInsertIfNotExistQuery;
    console.log(query);
    db((client) => {
        client.query(query, (err, result) => {
          if (err) {
            console.log("Fail to push questionnaire info");
            return;
          }
          console.log("Successfully pushed to questionnaire");
        });
      });

});

router.post('/nohousingrole', (req, res) => {
    // Store user into database

    // Store user into history table

    // Store nohousing into database
});
module.exports = router;