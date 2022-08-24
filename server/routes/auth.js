// require express
const express = require('express');
const bcrypt = require("bcrypt");
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
// require db connection
const db = require('../utils/database');
const { query } = require('express');
const router = express.Router();

// login with google
router.post('/loginwithgoogle', async (req, res) => {
    const makeid = length => {
        var result = '';
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    const uid = makeid(28);
    // get user info from req.body into user
    const user = req.body;
    try{
        const checkExistQuery = `SELECT * FROM BirdNest.User WHERE User.email = "${user.email}"`;
        const query = `INSERT INTO BirdNest.User (fullname, email, uid)
        VALUES("${user.fullname}", "${user.email}", "${uid}")`; // database link
        console.log(user);
        db(client => {
            client.query(checkExistQuery, (err, result) => {
                if(result.length){
                    // console.log( "User found successfully.");
                    res.send({
                        status: "login",
                        email: user.email,
                        name: user.fullname,
                        uid: result[0].uid,
                        id: result[0].id
                    });
                } else {
                    db(client => {
                        client.query(query, (err, result) => {
                            if(err) throw err;
                            db(client => {
                                client.query(checkExistQuery, (err, result) => {
                                    const id = result[0].id;
                                    // add matching table
                                    res.send({
                                        status: "register",
                                        email: user.email,
                                        name: user.fullname,
                                        uid: uid,
                                        id: id
                                    });
                                })
                            })
                        });
                    });
                }
            });
        })
    } catch(err) {
        res.status(400).send(err);
    }
})
// get user
router.get('/:email', async (req, res) => {
    try{
        const query = `SELECT * FROM BirdNest.User WHERE User.email = "${req.params.email}"`;
        db(client => {
            client.query(query, (err, result) => {
                if(err){
                    console.log(err)
                }else{
                    res.send(result);
                }
            });
        })
    } catch(err) {
        res.status(400).send(err);
    }
})
// get all users
router.get('/', (req, res) => {
    const query = `SELECT * FROM User`;
    db((client) => {
        client.query(query,(err, result) => {
            if(!err){
                res.send(result);
            } else {
                res.status(400).send();
            }
        });
    })
});
// update user role
router.post('/role', (req, res) => {
    const users = req.body;
    const query = `UPDATE Users SET Role= "${users.role}" WHERE id="${users.user_id}"`;
    db(client => {
        client.query(query, (err, result) => {
            if(result.length){
                // console.log( "User updated successfully.");
                res.status(200).send();
            } else {
                db(client => {
                    client.query(query, err => {
                        res.send(result);
                    });
                });
            }
        });
    })
});

// store user
router.post('/questionnaire', (req, res) => {
    let userInfo = req.body.userInfo;
    let incompleteQuery = "UPDATE User SET ";
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
            incompleteQuery += key + "=" + JSON.stringify(JSON.stringify(userInfo[key])) + ","; 
        }
        else if (userInfo[key] === false || userInfo[key] === true) {
            incompleteQuery += key + "=" + `${userInfo[key].toString()}` + ",";
        }
        //Arrays not sending properly 
        else {
            incompleteQuery += key + "=" + `"${userInfo[key].toString()}"` + ",";
        }
    }
    //UPDATE User Set role=... tellRoommateIfBothered=tellRoommateIfBothered, 
    incompleteQuery = incompleteQuery.slice(0, -1);
    //UPDATE User Set role=... tellRoommateIfBothered=tellRoommateIfBothered
    incompleteQuery += ` WHERE email = '${userInfo.email}';`
    const query = incompleteQuery;
    try {
        db(client => {
            client.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Update user successfully from questionnaire")
                    res.send(result);
                }
            }) 
        })
    }  
    catch(err) {
        res.status(400).send(err);
    } 
});



module.exports = router;