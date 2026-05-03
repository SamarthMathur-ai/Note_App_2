// const express = require("express")
// const app = express()
// const fs = require("fs");
// let users = require("./storage.json");
// const path = require("path");
// ?  IN ES MODULES WE DON'T HAVE TO WRAP IT IN A ASYNC
// ? ANOTHER BENEFIT OF THIS IS SUPPOSE IF WE IMPORT A MASSIVE LIBRARY AND IT ONLY USES A SINGLE FUNCTION IN OUR CODE THIS WILL REMOVE THE UNNECESSARY MATERIAL

// ! Changed code
import express from 'express'; // * as we are using ES module type
import mysql from 'mysql2/promise';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express()

const db = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"16121972Samarth!",
    database:"note_app"
});

// * Recreate __dirname and __filename (The ES Module workaround)
const __filename = fileURLToPath(import.meta.url); // * Because Express and your computer's file system can't read file:/// URLs, we use this built-in Node function to strip away the weird URL formatting and convert it back into a normal, readable computer path.
const __dirname = path.dirname(__filename); // * Now that we have the exact path to the server.js file, we just need the folder it sits inside. path.dirname() looks at the string, chops off the actual file name at the very end (\server.js), and leaves only the folder path.

let port = 8080;
console.log("My SQL is connected");



// let port = 8080;


// app.use(express.json());// * When the JSON package hit your server Express don't know how to automatically read it. This act as a translator, taking that raw JSON string and turning it into a usable JavaScript object attached to req.body
// app.use(express.static(path.join(__dirname,'public'))); // * This opens up a specific folder (in this case, one named public) and allows the browser to download files from it directly. because express is highly secure and hides all your files. If you don't have this line, your style.css and frontend script.js will fail to load because the browser gets blocked when it tries to ask for them. This line says, "Anything inside the public folder is safe to send to the browser."
// app.use(express.urlencoded({extended: false})); // * This parse data sent from standard HTML form (like <form action="/login" method="POST">) instead of using fetch the browser sends the data encoded in url. This line grabs that URL-encoded data and packages it neatly into req.body for you.

// app.set("view engine", "ejs"); // * This tells Express that you are using EJS(Embedded JavaScript) to generate your HTML. Express can't render dynamic HTML on its own. This line tells Express, "Go find the index.js" file, inject the data into it, convert the whole thing into standard HTML, and send it to the user.


// ! Changed Code
app.use(express.json()); // * JSON IS COMING IN HANDY
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));// * for complex things
app.set("view engine", "ejs");
console.log("This is working upto second step.");

// app.get("/", (req,res)=> {
//     res.render("index", {allnotes: users});
// })

// ! Changed Code
app.get("/",async (req,res)=>{
    try {
        const [users] = await db.execute(`
            SELECT * FROM notes ORDER BY update_time DESC;   
        `)
        res.render("index", {allnotes:users})
    } catch (error) {
        console.log(`Database error: ${error}`);
        res.status(500).send("Something went wrong");
    }
})
// * Nothing to change here





// app.get("/getNote/:id", (req,res)=> {
//     const id = req.params.id;

//     const foundNote = users.find(n => n.id==id); // * Here it is sending the whole object

//     if(foundNote) {
//         res.json(foundNote); // * Here it is sending the whole response as json file.
//     } else {
//         res.status(404).send("not found");
//     }
    
// })



// ! Changed Code

// * Making a database
// await db.execute(`
//     CREATE DATABASE IF NOT EXISTS note_app
// `);

// console.log("Database created.");

// await db.query(`
//     USE note_app;
// `);

// await db.execute(`
//     CREATE TABLE notes(
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255),
//         content TEXT 
//     )
// `)
 // ? Remember to add the timestamp in future

// console.log("Using database.")

//! Starting from here again
app.get("/getNote/:id", async (req,res)=>{
    const select_id = req.params.id;

    const [result] = await db.execute(`
        SELECT * FROM notes WHERE id = ?
    `,[select_id])

    const foundNote = result[0]; // ? so that meta data does not come

    if(foundNote) {
        res.json(foundNote);
    } else {
        res.status(404).send("not found");
    }
})


// app.post("/save", (req,res)=> {
//     const {title, content, id} = req.body;
//     let currId = id;
//     if(currId) {
//         const index = users.findIndex(u=>u.id == currId);
//         users[index] = {...users[index],title, content}; // should be the same to overwrite the name.// * It is putting here only from the frontend only
//     }
//     else {
//         currId = Date.now();
//         users.push({id: currId, content ,title});
//     }
    
//     fs.writeFile('./storage.json', JSON.stringify(users), (err,data)=> {// * Making string which we wil not use.
//         console.log("Is it showing");
//         return res.json({status: "200", id: currId});
//     })
// })

// ! Changed Code
app.post("/save", async (req,res)=> {
    console.log("Full Body Received:", req.body);
    const {title, content, id} = req.body;
    let currId = id;
    if(currId) {
        try {
            const [rows] = await db.execute(`
                SELECT id FROM notes WHERE id = ?
            `,[currId]);
            // ? if the row exists
            if(rows.length>0) {
                let index = currId;
                await db.execute(`
                    UPDATE notes SET title = ?, content = ?, update_time = CURRENT_TIMESTAMP WHERE id = ?
                `,[title,content,index]);
                console.log("Updated the curr note");
                res.json({status:200, message:"Successfully updated"})
            }
        } catch (error) {
            console.log(`Database error: ${error}`);
            res.status(500).send("There is some problem");
        }
    }
    else {
        try {
            await db.execute(`
                INSERT INTO notes(title,content)
                VALUES
                (?,?)
            `,[title,content]);
            console.log("Added new note.");
            res.json({status:200, message:"New data inserted."})
        } catch (error) {
            console.log(`Database error: ${error}`);
            res.status(500).send("There is some problem");
        }
    }
    console.log(await db.execute(`
        SELECT * FROM notes;
    `));
})


// app.delete("/delete/:id",(req,res)=> {
//     const id = req.params.id;
//     users = users.filter(n=> n.id != id); // * Filter the data where it is not  id.

//     fs.writeFile('./storage.json', JSON.stringify(users), (err,data)=> {
//         console.log("The data is deleted and the new data is saved unto the file.");
//         return res.json({status: "200", id: id});
//     })
// })
// ! Changed Code
app.delete("/delete/:id",async (req,res)=> {
    try {
        const currId = req.params.id;
        console.log("Working upto here.");
        await db.execute(`
           DELETE FROM notes WHERE id = ? 
        `, [currId]);
        console.log(await db.execute(`
            SELECT * FROM notes;
        `));
        res.json({status: "200", message:"Deleted"})
    } catch (error) {
        console.log(`Database Error ${error}`);
        res.status(500).send("Something went wrong");
    }
})

// app.listen(port, ()=> {
//     console.log(`app is listening on ${port}`);

// })
// ! Changed Code

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})


