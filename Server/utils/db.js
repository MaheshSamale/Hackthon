const mysql = require('mysql2')

const pool = mysql.createPool({
     host: 'localhost',
    user: 'root',
    password: 'Rutuja0802@',
    database: 'blogs'
})

module.exports = pool