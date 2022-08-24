// require express
const express = require('express');
// require db connection
const db = require('../utils/database');
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


router.post('/getMatchedChatUsersFromList', (req, res) => {
    var uidList = req.body.uidList;
    const inClauseArray = uidList.join(', ');
    if(uidList){
        const query = `SELECT fullname, profilepic, uid, id FROM BirdNest.User WHERE id IN (${inClauseArray})`
        db(client => {
            client.query(query, (err, result) => {
                if(err) throw err
                res.send(result);
            })
        })
    }
});

module.exports = router;
