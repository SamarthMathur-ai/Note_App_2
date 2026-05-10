import mysql from 'mysql2/promise';

const db = mysql.createPool({ // * Much better because it can haandle multiple request at once.
    host: 'localhost',
    user: 'root',
    password: '16121972Samarth!',
    database: 'note_app'
})

export default db;