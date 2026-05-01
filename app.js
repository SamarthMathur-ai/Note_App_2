import mysql from "mysql2/promise";

// ! 1: to connect at mysql server
const db = await mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "16121972Samarth!",
    database: ""
})

console.log('SQL is connected');

// ! 2: we need to create a database
// await db.execute(`CREATE DATABASE IF NOT EXISTS mysql_db`);
//? Here we need a data structure to store it 
// const [detail] = await db.execute(`Show DATABASES`);
// console.log(detail);
// ! 2.5: select the database
// ? Here .query() will be used for this command
await db.query(
    `
    USE mysql_db;
    `
)
// ! 3: then we to create a table
// await db.execute(
//     `
//     CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE
//     );`
// );
// ! 4: is to perform CRUD operation
// await db.execute(`
//     INSERT INTO users(username,email)
//     VALUES
//     ('Vinod','Vinod@gmail.com')   `   
// );

// ! Prepared Statement Preferred Way.
// await db.execute(`
//     INSERT INTO users(username,email)
//     VALUES
//     (?,?) `,["Baua","baua@gmail.com"]   
// );

//* We can also put an array of array in that case we have to put .query and "?" only
// const values = [
//     ["Daksh","daksh@gmail.com"],
//     ["Satvik","satvik@gmail.com"],
//     ["Sufyian","sufyian@gmail.com"],
//     ["Sanyam","sanyam@gmail.com"],
//     ["Samriddhi","samriddhi@gmail.com"]
// ]
// await db.query(`
//     INSERT INTO users(username,email)
//     VALUES
//     ?`,[values]   
// );


// ! Updating the value
// const [value] = await db.execute(`
//     UPDATE users SET username='VinodVinod' WHERE email='vinod@gmail.com'
// `)
// console.log(value);


// ! Deleting the value in try catch block
// try{
//     const [value] = await db.execute(`
//         DELETE FROM users WHERE email='daksh@gmail.com'
//     `)
//     console.log(value);
// } catch(error) {
//     console.log(error);
// }


// ! Updating also with using the prepared statement same for DELETE operation also
try{
    const[value] = await db.execute(`
        UPDATE users SET username="Satvik Vyas" WHERE email="satvik@gmail.com"
    `)
    console.log(value);
} catch(error) {
    console.log(error);
}

const [rows] = await db.execute(`SELECT * FROM users;`)
console.log(rows)
// ? If only we write rows then fields(metadata) bhi ayega sath me.