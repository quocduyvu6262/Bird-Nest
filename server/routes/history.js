// require express
const express = require('express');

// require db connection
const db = require('../utils/database');
const router = express.Router();

router.post('/all', (req, res) => {
    var provided_id = req.body.user_id; //temporary ID until backend connected to frontend

    const userQuery = `SELECT list_of_users_all FROM BirdNest.History WHERE User_id = ${provided_id}`;
    db(client => {
        client.query(userQuery, (err, result) => { //query to find list of users of whom the provided_id user left AND right on
            if(err) throw err;
            var list_of_users = result[0].list_of_users_all; //grabs result
            list_of_users = JSON.parse(list_of_users); //converts result from string to an array
            var history_list = []; //inital empty array that will contain all matches that were swiped
            var count = 0;
            list_of_users.forEach(ID => { //iterates through each ID that the user swiped on
                var retrieveInfo = `(SELECT User.*, Housing.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (isHousing = 1 AND User.id = ${ID})) UNION (SELECT User.*, NoHousing.*, Matching.number FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (isHousing = 0 AND User.id = ${ID}))`;
                client.query(retrieveInfo, (err, individualInfo) => {
                    if(err) throw err;
                    var temp_list = individualInfo[0]; //grabs current user's information
                    count++;
                    history_list.push(temp_list); //adds current user's information to the final array to be sent
                    if(count == list_of_users.length) { //if all the users that were swiped through have been iterated
                        res.send(history_list); //send final array containing the provided_user's swipe history
                        return;
                    }
                });
            });
        });
    });
});
router.post('/yes', (req, res) => {
    var provided_id = req.body.user_id; //temporary ID until backend connected to frontend

    const userQuery = `SELECT list_of_users_yes FROM BirdNest.History WHERE User_id = ${provided_id}`;
    db(client => {
        client.query(userQuery, (err, result) => { //query to find list of users of whom the provided_id user left AND right on
            if(err) throw err;
            var list_of_users = result[0].list_of_users_yes; //grabs result
            list_of_users = JSON.parse(list_of_users); //converts result from string to an array
            var history_list = []; //inital empty array that will contain all matches that were swiped
            var count = 0;
            list_of_users.forEach(ID => { //iterates through each ID that the user swiped on
                var retrieveInfo = `(SELECT User.*, Housing.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (isHousing = 1 AND User.id = ${ID})) UNION (SELECT User.*, NoHousing.*, Matching.number FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (isHousing = 0 AND User.id = ${ID}))`;
                client.query(retrieveInfo, (err, individualInfo) => {
                    if(err) throw err;
                    var temp_list = individualInfo[0]; //grabs current user's information
                    count++;
                    history_list.push(temp_list); //adds current user's information to the final array to be sent
                    if(count == list_of_users.length) { //if all the users that were swiped through have been iterated
                        res.send(history_list); //send final array containing the provided_user's swipe history
                        return;
                    }
                });
            });
        });
    });
});
router.post('/no', (req, res) => {
    var provided_id = req.body.user_id; //temporary ID until backend connected to frontend

    const userQuery = `SELECT list_of_users_no FROM BirdNest.History WHERE User_id = ${provided_id}`;
    db(client => {
        client.query(userQuery, (err, result) => { //query to find list of users of whom the provided_id user left AND right on
            if(err) throw err;
            var list_of_users = result[0].list_of_users_no; //grabs result
            list_of_users = JSON.parse(list_of_users); //converts result from string to an array
            var history_list = []; //inital empty array that will contain all matches that were swiped
            var count = 0;
            list_of_users.forEach(ID => { //iterates through each ID that the user swiped on
                var retrieveInfo = `(SELECT User.*, Housing.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (isHousing = 1 AND User.id = ${ID})) UNION (SELECT User.*, NoHousing.*, Matching.number FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (isHousing = 0 AND User.id = ${ID}))`;
                client.query(retrieveInfo, (err, individualInfo) => {
                    if(err) throw err;
                    var temp_list = individualInfo[0]; //grabs current user's information
                    count++;
                    history_list.push(temp_list); //adds current user's information to the final array to be sent
                    if(count == list_of_users.length) { //if all the users that were swiped through have been iterated
                        res.send(history_list); //send final array containing the provided_user's swipe history
                        return;
                    }
                });
            });
        });
    });
});
router.get('/test', (req, res) => {
    const query = "SELECT * FROM BirdNest.History"
    db(client => {
        client.query(query, (err, result) => {
            if(!err){
                res.send(result);
            } 
        })
    })
})

module.exports = router;
