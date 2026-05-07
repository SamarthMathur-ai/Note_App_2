import express from 'express'
import mysql from 'mysql2/promise';

const router = express.Router();  // ! It basically helps in modularity of the routing files.
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "note_app",
    password: "16121972Samarth!"
});

try {
    await db.execute(`
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        )
    `)
    await db.execute(`
        SELECT * FROM users;
    `)
} catch (error) {
    console.log(error);
    
}