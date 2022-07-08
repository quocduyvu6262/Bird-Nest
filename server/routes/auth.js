const express = require('express');

const bcrypt = require("bcrypt");
const db = require('../utils/database');
const {sshConfig, dbConfig} = require('../utils/tunnelConfig');
const router = express.Router();


router.post('/register', (req, res) => {
    res.send('Register route');
    const user = req.body;
});

router.post('/login', (req, res) => {
    res.send('login route');
})

router.post('/createUser', async (req, res) => {
    
})
module.exports = router;