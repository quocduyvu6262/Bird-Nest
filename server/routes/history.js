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
            if(err) {
                throw err
            };
            if(!result[0]) return;
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
            if(err) throw {
                err
            };
            if(!result[0]) return;
            var list_of_users = result[0].list_of_users_yes; //grabs result
            list_of_users = JSON.parse(list_of_users); //converts result from string to an array
            var history_list = []; //inital empty array that will contain all matches that were swiped
            var count = 0;
            list_of_users.forEach(ID => { //iterates through each ID that the user swiped on
                var retrieveInfo = `(SELECT User.*, Housing.*, Matching.number FROM BirdNest.User JOIN BirdNest.Housing ON User.id = Housing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (User.id = ${ID})) UNION (SELECT User.*, NoHousing.*, Matching.number FROM BirdNest.User JOIN BirdNest.NoHousing ON User.id = NoHousing.User_id JOIN BirdNest.Matching ON User.id = Matching.User_id WHERE (User.id = ${ID}))`;
                client.query(retrieveInfo, (err, individualInfo) => {
                    if(err) {
                        throw err;
                    }
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
            if(err) {
                throw err
            };
            if(!result[0]) return;
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
router.post('/matches', (req, res) => {
    var user_id = req.body.user_id;
    const query = `SELECT matches FROM BirdNest.User WHERE id = ${user_id}`;
    db(client => {
        let final = [];
        client.query(query, (err, result) => {
            if(err) throw err;
            let matches = JSON.parse(result[0].matches);
            for(let i = 0; i < matches.length; i++) {
                const namePic = `SELECT fullname, profilepic, uid FROM BirdNest.User WHERE id = ${matches[i]}`;
                client.query(namePic, (err, result3) => {
                    if(err) throw err;
                    final.push(result3);
                    if(i == matches.length - 1) {
                        res.send(final);
                    }
                })
            }
        });
    });
});
router.get('/test', (req, res) => {
    const query = "SELECT * FROM BirdNest.History"
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
router.post('/picName2', (req, res) => {
    var matched_user = req.body.user_id;
    const query = `SELECT list_of_users_yes FROM BirdNest.History WHERE User_id = ${matched_user}`;
    db(client => {
        client.query(query, (err, result) => {
            if(err) throw err;
            let matches = JSON.parse(result[0].list_of_users_yes);
            let match_id = matches[matches.length-1];
            const infoQuery = `SELECT fullname, profilepic FROM BirdNest.User WHERE id = ${match_id}`;
            client.query(infoQuery, (err, result) => {
                res.send(result);
            });
        });
    });
});

router.post('/token', (req, res) => {
    var user_id = req.body.user_id;
    var token = req.body.token;
    const query = `UPDATE BirdNest.User SET token = '${token}' WHERE id = ${user_id}`;
    db(client => {
        client.query(query, (err, result) => {
            if(err) throw err;
            res.send("Token inserted!");
        });
    });
});

router.post('/matches', (req, res) => {
    var user_id = req.body.user_id;
    const query = `SELECT matches FROM BirdNest.User WHERE id = ${user_id}`;
    db(client => {
        let final = [];
        client.query(query, (err, result) => {
            if(err) throw err;
            let matches = JSON.parse(result[0].matches);
            for(let i = 0; i < matches.length; i++) {
                const namePic = `SELECT fullname, profilepic, uid FROM BirdNest.User WHERE id = ${matches[i]}`;
                client.query(namePic, (err, result3) => {
                    if(err) throw err;
                    final.push(result3);
                    if(i == matches.length - 1) {
                        res.send(final);
                    }
                })
            }
        });
    });
});
module.exports = router;
