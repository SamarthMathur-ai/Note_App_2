import db from '../config/dbConnection.js';


// * getting all notes
export const getAllNotes = async (req,res)=>{

    try {
        const searchQuery =req.query.q;
        // ? if the query exists at all
        if(searchQuery !== undefined) {
            // * If there is a search term run the filtered query
            const searchValue = `%${searchQuery}%`
            const [users] = await db.execute(`
                SELECT * FROM notes WHERE content LIKE ? OR title LIKE ? ORDER BY update_time DESC;
            `,[searchValue,searchValue])

            // ? Always remember tos= send data as JSON
            return res.json(users);
        } else {
            const [users] = await db.execute(`
                SELECT * FROM notes ORDER BY update_time DESC;   
            `)
            res.render("index", {allnotes:users})
        }
    } catch (error) {
        console.log(`Database error: ${error}`);
        res.status(500).send("Something went wrong");
    }
}



// * getting notes by id
export const getNoteById = async (req,res)=>{
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
}




// * saving the notes
export const saveNote =  async (req,res)=> {
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
}



// * Deleting the node

export const deleteNote = async (req,res)=> {
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
}