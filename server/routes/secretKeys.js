const express = require('express');
const router = express.Router();
require('dotenv').config();


router.get('/', (req, res) => {
    const secretKeys = {
        IOS_GOOGLE_CLIENT_ID : process.env.IOS_GOOGLE_CLIENT_ID,
        CHAT_API_KEY : process.env.CHAT_API_KEY,
        CHAT_API_SECRET : process.env.CHAT_API_SECRET,
        GEOCODING_KEY : process.env.GEOCODING_KEY,
        FIREBASE_API_KEY : process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN : process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID : process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID : process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID : process.env.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID : process.env.FIREBASE_MEASUREMENT_ID
    }
    res.status(200).send(secretKeys);
})

module.exports = router;
