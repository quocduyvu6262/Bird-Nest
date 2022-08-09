// require express
const express = require('express');
// require db connection
const router = express.Router();
const StreamChat = require('stream-chat').StreamChat

router.post('/', (req, res) => {
    const userID = req.body.uid;
    const serverClient = StreamChat.getInstance( process.env.CHAT_API_KEY, process.env.CHAT_API_SECRET);
    // Create User Token
    const token = serverClient.createToken(userID);
    if(token){
        res.status(200).send(token);
        console.log('Token generated successfully');
    } else {
        console.log('Cannot generate token');
    }
})

module.exports = router;
