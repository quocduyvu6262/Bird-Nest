const mysqlssh = require('mysql2-ssh');
const fs = require('fs');
const {sshConfig, dbConfig} = require('./tunnelConfig');

const db = async (query, handleQuery) => {
    await mysqlssh.connect(
        sshConfig, dbConfig
    )
    .then(client => {
        client.query(query, handleQuery);
        
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = db;
