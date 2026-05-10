// const express = require("express")
// const app = express()
// const fs = require("fs");
// let users = require("./storage.json");
// const path = require("path");
// ?  IN ES MODULES WE DON'T HAVE TO WRAP IT IN A ASYNC
// ? ANOTHER BENEFIT OF THIS IS SUPPOSE IF WE IMPORT A MASSIVE LIBRARY AND IT ONLY USES A SINGLE FUNCTION IN OUR CODE THIS WILL REMOVE THE UNNECESSARY MATERIAL

// ! Changed code
import express from 'express'; // * as we are using ES module type
import { getAllNotes, getNoteById, saveNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router()

let port = 8080;
console.log("My SQL is connected");



// let port = 8080;


// app.use(express.json());// * When the JSON package hit your server Express don't know how to automatically read it. This act as a translator, taking that raw JSON string and turning it into a usable JavaScript object attached to req.body
// app.use(express.static(path.join(__dirname,'public'))); // * This opens up a specific folder (in this case, one named public) and allows the browser to download files from it directly. because express is highly secure and hides all your files. If you don't have this line, your style.css and frontend script.js will fail to load because the browser gets blocked when it tries to ask for them. This line says, "Anything inside the public folder is safe to send to the browser."
// app.use(express.urlencoded({extended: false})); // * This parse data sent from standard HTML form (like <form action="/login" method="POST">) instead of using fetch the browser sends the data encoded in url. This line grabs that URL-encoded data and packages it neatly into req.body for you.

// app.set("view engine", "ejs"); // * This tells Express that you are using EJS(Embedded JavaScript) to generate your HTML. Express can't render dynamic HTML on its own. This line tells Express, "Go find the index.js" file, inject the data into it, convert the whole thing into standard HTML, and send it to the user.


// ! Changed Code


// app.get("/", (req,res)=> {
//     res.render("index", {allnotes: users});
// })

// ! Changed Code
router.get("/", getAllNotes);
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
router.get("/getNote/:id", getNoteById);


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
router.post("/save",saveNote);


// app.delete("/delete/:id",(req,res)=> {
//     const id = req.params.id;
//     users = users.filter(n=> n.id != id); // * Filter the data where it is not  id.

//     fs.writeFile('./storage.json', JSON.stringify(users), (err,data)=> {
//         console.log("The data is deleted and the new data is saved unto the file.");
//         return res.json({status: "200", id: id});
//     })
// })
// ! Changed Code
router.delete("/delete/:id",deleteNote);

// app.listen(port, ()=> {
//     console.log(`app is listening on ${port}`);

// })
// ! Changed Code

export default router;