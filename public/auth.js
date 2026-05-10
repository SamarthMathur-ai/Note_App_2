import bcrypt from `bcrypt`; // * widely used, adaptive password-hashing function designed to securely store passwords by transforming them into unique, unreadable hashes.
import jwt from 'jsonwebtoken';
import 'dotenv/config'; // * help to take material from dotenv file
import path from 'path'; // * The path module automatically detects the operating system and uses the correct format, ensuring your code works across all platforms without manual string manipulation
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "16121972Samarth!",
    database: "note_app"
})


const handleLogin = async(req , res) => {
    const {user,pwd} = req.body;
    if(!user||!pwd)return res.status(500).send("There is some problem in the retrieving process.");
    try {
        const [userFind] = await db.execute(`
            SELECT * FROM user WHERE name = user;
        `)
    } catch (error) {
        console.log(`Database Error: ${error}`);
        res.status(500).send("There is some problem in the database.")
    }
    // * If user is not found
    if(!userFind) return res.sendStatus(401); // * Unauthorised


    // ! If user is find we will match the pwd given with the already hashed password
    const match = await bcrypt.compare(pwd, userFind.password); //* because bcrypt password are one way we cannot decrypt a hashed password instead becrypt.compare rehashes the new input and checks if the results are identical.
    //* securely verifies if a plain text password matches a stored hashed password.

    // ! If matched then we will create a access token and a refresh token
    if(match) {
        const accessToken = jwt.sign(
            { "username": userFind.name }, // * We only take username because it's a jwt token and it can be accessible to all and we don't want some sucker to have those juicy passwords
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": userFind.name },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '3d' }
        )


        // ! Saving refreshToken with current user
        // * How to do it in json although it is no use for us.
        // const otherUsers = usersDB.users.filter(person => person.uername!==foundUser.username);
        // const currentUser = {...foundUser,refreshToken};
        // usersDB.setUsers([...otherUsers, currentUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..','model','users.json'),
        //     JSON.stringify(usersDB.users)
        // );

        // * How to do it in database?
        await db.execute(`
            UPDATE users
            SET passkey = refreshToken
            WHERE name = user;
        `)
        res.cookie('jwt', refreshToken, {httpOnly:true, maxAge: 24*60*60*1000});
        res.json({accessToken});
    } else {
        res.sendStatus(401);
    }
    


    
}

export {handleLogin};
