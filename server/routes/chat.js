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

router.post('/getUpdatedMatchedChatUsers', (req, res) => {
    var id = req.body.id;
    const query = `SELECT matchedChat FROM BirdNest.User WHERE id =${id}`
    db(client => {
        client.query(query, (err, result) => {
            if(err) throw err
            const idList = result[0].matchedChat;
            if(idList){
                const inClauseArray = idList.join(', ');
                const query = `SELECT fullname, profilepic, uid, id FROM BirdNest.User WHERE id IN (${inClauseArray})`
                db(client => {
                    client.query(query, (err, result) => {
                        if(err) throw err;
                        res.send(result);
                    })
                })
            }
        })
    })
});

router.post('/updateMatchedChatUsersFromList', (req, res) => {
    let id = req.body.id;
    let uidList = req.body.uidList;
    const query = `UPDATE BirdNest.User SET matchedChat = ${JSON.stringify(JSON.stringify(uidList))} WHERE id = ${id}`;
    db(client => {
        client.query(query, (err, result) => {
            if(err) throw err;
            res.status(200).send('Update new matched user chat successfully');
        })
    })
})

module.exports = router;
