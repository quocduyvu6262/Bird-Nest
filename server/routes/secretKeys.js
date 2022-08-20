const express = require('express');
const router = express.Router();
require('dotenv').config();


router.get('/', (req, res) => {
    const secretKeys = {
        CHAT_API_KEY : process.env.CHAT_API_KEY,
        CHAT_API_SECRET : process.env.CHAT_API_SECRET,
        GEOCODING_KEY : process.env.GEOCODING_KEY
    }
    res.status(200).send(secretKeys);
})

module.exports = router;
