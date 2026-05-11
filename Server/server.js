import express from 'express'; // * as we are using ES module type
import path from 'path';
import {fileURLToPath} from 'url';
import notesRoutes from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
// * Recreate __dirname and __filename (The ES Module workaround)
const __filename = fileURLToPath(import.meta.url); // * Because Express and your computer's file system can't read file:/// URLs, we use this built-in Node function to strip away the weird URL formatting and convert it back into a normal, readable computer path.
const __dirname = path.dirname(__filename); // * Now that we have the exact path to the server.js file, we just need the folder it sits inside. path.dirname() looks at the string, chops off the actual file name at the very end (\server.js), and leaves only the folder path.
const port = 8080;

// ! middleware
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");


app.get("/", (req,res)=>{
    res.render("login.ejs");
})

app.use("/auth", userRoutes)
// * hand off to router
app.use("/", notesRoutes);

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});

