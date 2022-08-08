const mysqlssh = require('mysql2-ssh');
const fs = require('fs');
const {sshConfig, dbConfig} = require('./tunnelConfig');


const db = async (handleClient) => {
    await mysqlssh.connect(
        sshConfig, dbConfig
    )
    .then(client => {
        handleClient(client);
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = db;
