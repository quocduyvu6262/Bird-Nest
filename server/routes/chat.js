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



router.post('/matches', (req, res) => {
    var user_id = req.body.user_id;
    const query = `SELECT matches FROM BirdNest.User WHERE id = ${user_id}`;
    db(client => {
        let final = [];
        client.query(query, (err, result) => {
            if(err) throw err;
            let matches = JSON.parse(result[0].matches);
            if(matches){
                for(let i = 0; i < matches.length; i++) {
                    const namePic = `SELECT fullname, profilepic, uid FROM BirdNest.User WHERE id = ${matches[i]}`;
                    client.query(namePic, (err, result) => {
                        if(err) throw err;
                        const matchedUser = result[0];
                        final.push(matchedUser);
                        if(i == matches.length - 1) {
                            res.send(final);
                        }
                    })
                }
            }
        });
    });
});

router.post('/matchedChat', (req, res) => {
    var uidList = req.body.uidList;
    let final = [];
    if(uidList){
        let index = 0
        for(let i = 0; i < uidList.length; i++) {
            const query = `SELECT fullname, profilepic, uid, id FROM BirdNest.User WHERE id = ${uidList[i]}`
            db(client => {
                client.query(query, (err, result) => {
                    if(err) throw err
                    final.push(result[0]);
                    if(i == uidList.length - 1){
                        res.status(200).send(final)
                    }
                })
            })
        };
    }
});

// router.post('/matchedChat', (req, res) => {
//     var user_id = req.body.user_id;
//     const query = `SELECT matchedChat FROM BirdNest.User WHERE id = ${user_id}`;
//     db(client => {
//         let final = [];
//         client.query(query, (err, result) => {
//             if(err) throw err;
//             let matches = result[0].matchedChat;
//             if(matches){
//                 for(let i = 0; i < matches.length; i++) {
//                     const namePic = `SELECT fullname, profilepic, uid FROM BirdNest.User WHERE id = ${matches[i]}`;
//                     client.query(namePic, (err, result) => {
//                         if(err) throw err;
//                         const matchedUser = result[0];
//                         final.push(matchedUser);
//                         if(i == matches.length - 1) {
//                             res.send(final);
//                         }
//                     })
//                 }
//             }
//         });
//     });
// });

module.exports = router;
