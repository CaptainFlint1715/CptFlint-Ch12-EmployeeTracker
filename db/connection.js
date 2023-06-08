const mysql = require('mysql2')

// allows connection to mysql2 module to be utilized in app
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'CaptainFlint!@49',
        database: 'employee_db'
    },
    console.log('connected to employee_db database')
)

module.exports = db