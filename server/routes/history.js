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
                var retrieveInfo = `(SELECT User.*, Housing.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (User.id = ${ID})) UNION (SELECT User.*, NoHousing.*, Matching.number FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (User.id = ${ID}))`;
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
                var retrieveInfo = `(SELECT User.*, Housing.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (User.id = ${ID})) UNION (SELECT User.*, NoHousing.*, Matching.number FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (User.id = ${ID}))`;
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
                var retrieveInfo = `(SELECT User.*, Housing.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (User.id = ${ID})) UNION (SELECT User.*, NoHousing.*, Matching.number FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (User.id = ${ID}))`;
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
router.post('/insertYes', (req, res) => {
    var provided_id = req.body.user_id; 
    var swiped_id = req.body.swiped_id;

    const userQuery = `SELECT list_of_users_yes FROM BirdNest.History WHERE User_id = ${provided_id}`;
    db(client => {
        client.query(userQuery, (err, result) => { //query to find list of users of whom the provided_id user left AND right on
            if(err) throw err;
            var list_of_users = result[0].list_of_users_yes; //grabs result
            if(list_of_users == null) {
                list_of_users = [];
            }
            else {
                list_of_users = JSON.parse(list_of_users); //converts result from string to an array
            }
            list_of_users.push(swiped_id);
            let new_users = JSON.stringify(list_of_users);
            const newQuery = `UPDATE BirdNest.History SET list_of_users_yes = '${new_users}' WHERE User_id = ${provided_id};`;
            client.query(newQuery, (err, result) => {
                if(err) throw err;
            });
        });
        const matchQuery = `SELECT list_of_users_yes FROM BirdNest.History WHERE User_id = ${swiped_id}`;
        client.query(matchQuery, (err, result) => {
            let matched = false;
            if(err) throw err;
            var list_of_users = result[0].list_of_users_yes; //grabs result
            if(list_of_users == null) {
                list_of_users = [];
            }
            else {
                list_of_users = JSON.parse(list_of_users); //converts result from string to an array
            }
            list_of_users.forEach(ID => {
                if(ID == provided_id) {
                    matched = true;
                    const getMatches1 = `SELECT matches FROM BirdNest.User WHERE id = ${provided_id}`;
                    const getMatches2 = `SELECT matches FROM BirdNest.User WHERE id = ${swiped_id}`;
                    client.query(getMatches1, (err1, result1) => {
                        client.query(getMatches2, (err2, result2) => {
                            let resultMatch1 = result1[0].matches;
                            let resultMatch2 = result2[0].matches
                            if(resultMatch1 == null) {
                                resultMatch1 = [];
                            }
                            else {
                                resultMatch1 = JSON.parse(resultMatch1); //converts result from string to an array
                            }
                            if(resultMatch2 == null) {
                                resultMatch2 = [];
                            }
                            else {
                                resultMatch2 = JSON.parse(resultMatch2); //converts result from string to an array
                            }
                            resultMatch1.push(swiped_id);
                            resultMatch2.push(provided_id);
                            resultMatch1 = JSON.stringify(resultMatch1);
                            resultMatch2 = JSON.stringify(resultMatch2);
                            const addQuery1 = `UPDATE BirdNest.User SET matches = '${resultMatch1}' WHERE id = ${provided_id};`;
                            const addQuery2 = `UPDATE BirdNest.User SET matches = '${resultMatch2}' WHERE id = ${swiped_id};`;
                            client.query(addQuery1, (err, result) => {
                                if(err) throw err;
                            });
                            client.query(addQuery2, (err, result) => {
                                if(err) throw err;
                                return res.send('History updated and match found between users!');
                            });
                        });
                    });
                }
                return;
            });
            if(!matched) {
                res.send('History updated but match not found between users.');
            }
        });
    });
});
router.post('/insertNo', (req, res) => {
    var provided_id = req.body.user_id; 
    var swiped_id = req.body.swiped_id;

    const userQuery = `SELECT list_of_users_no FROM BirdNest.History WHERE User_id = ${provided_id}`;
    db(client => {
        client.query(userQuery, (err, result) => { //query to find list of users of whom the provided_id user left AND right on
            if(err) throw err;
            var list_of_users = result[0].list_of_users_no; //grabs result
            if(list_of_users == null) {
                list_of_users = [];
            }
            else {
                list_of_users = JSON.parse(list_of_users); //converts result from string to an array
            }
            list_of_users.push(swiped_id);
            let new_users = JSON.stringify(list_of_users);
            const newQuery = `UPDATE BirdNest.History SET list_of_users_no = '${new_users}' WHERE User_id = ${provided_id};`;
            client.query(newQuery, (err, result) => {
                if(err) throw err;
                res.send('Inserted successfully into History table!')
            });
        });
    });
});
router.get('/picName', (req, res) => {
    var matched_user = req.body.matched_user; 
    const query = `SELECT matches FROM BirdNest.User WHERE id = ${matched_user}`;
    db(client => {
        client.query(query, (err, result) => {
            if(err) throw err;
            let matches = JSON.parse(result[0].matches);
            let match_id = matches[matches.length-1];
            const infoQuery = `SELECT fullname, profilepic FROM BirdNest.User WHERE id = ${match_id}`;
            client.query(infoQuery, (err, result) => {
                res.send(result);
            });
        });
    });
});

module.exports = router;
