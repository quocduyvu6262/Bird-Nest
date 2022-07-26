// require express
const express = require('express');
const bcrypt = require("bcrypt");
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

// require db connection
const db = require('../utils/database');
const router = express.Router();


// add validation
const validate = [
    check('fullname')
        .isLength({min: 2})
        .withMessage('Your full name is required.'),
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least six characters')
]

// register
router.post('/register', validate, async (req, res) => {
    const user = req.body;
    // validation
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors: err.array()});
    }
    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    try{
        const query = `INSERT INTO User (fullname, email, username, password)
        VALUES("${user.fullname}", "${user.email}", "${user.username}", "${hashedPassword}")`;
        db(client => {
            client.query(query, err => {
                if(err){
                    console.log(err);
                    res.status(400).send(`Bad request.`);
                    return;
                }
                res.send(`Register new user successfully`);
            });
        });
    } catch(err) {
        res.status(400).send(err);
    }
});

// login
router.post('/login', async (req, res) => {
    const query = `SELECT email, password FROM User WHERE email = "${req.body.email}"`;
    db(client => {
        client.query(query, async (err, result) => {
            if(err) {
                console.log(err);
                res.status(400).send(`Bad Request.`)
                return;
            } else if (result.length == 0) {
                return res.status(404).send('User is not registered.');
            } else {
                const user = result[0];
                const validPassword = await bcrypt.compare(req.body.password, user.password);
                if(!validPassword) return res.status(400).send('Invalid Email or Password');
                // create and assign a token
                const token = jwt.sign({id: user.id, email: user.email}, 
                    process.env.SECRET_KEY);
                res.header('auth-token', token).send({message: 'Logged in successfully', token});
            }
        });
    });
});

// login with google 
router.post('/loginwithgoogle', async (req, res) => {
    // get user info from req.body into user
    const user = req.body;
    try{
        const checkExistQuery = `SELECT User.email FROM BirdNest.User WHERE User.email = "${user.email}"`;
        const query = `INSERT INTO BirdNest.User (fullname, email)
        VALUES("${user.fullname}", "${user.email}")`; // database link
        db(client => {
            client.query(checkExistQuery, (err, result) => {
                if(result.length){
                    // console.log( "User found successfully.");
                    res.send('login');
                } else {
                    db(client => {
                        client.query(query, err => {
                            res.send('register');
                        });
                    });
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
// update user


module.exports = router;