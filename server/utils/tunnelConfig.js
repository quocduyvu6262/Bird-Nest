require('dotenv').config();


const sshConfig = {
    host: process.env.SSH_HOST,
    user: process.env.SSH_USER,
    password: process.env.SSH_PASS
}

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}


module.exports = {
    sshConfig: sshConfig,
    dbConfig: dbConfig
}