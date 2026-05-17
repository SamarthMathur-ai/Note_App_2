import db from '../config/dbConnection.js';
import bcrypt from 'bcrypt'; // * widely used, adaptive password-hashing function designed to securely store passwords by transforming them into unique, unreadable hashes.
import jwt from 'jsonwebtoken';
import path from 'path'; // * The path module automatically detects the operating system and uses the correct format, ensuring your code works across all platforms without manual string manipulation
// import { redirect } from 'statuses'; // ? Check what it is

const userSignup = async (req,res)=>{
    const data = req.body;
    const [user] = await db.execute(`
        SELECT * FROM users WHERE username=? OR email=?;
    `,[data.Username,data.email])

    if(user.length>0) {
        
        res.json({message:"User already exists."})
    } else {
        // *! 10 is the salt rounds. It makes the encryption slow enough to stoop hackers but fast enough that your user doesn't notice the delay.
        const hashedPassword = await bcrypt.hash(data.Password,10);
        const values = [data.Username,data.fullName,data.email,hashedPassword]
        try {
            await db.execute(`
                INSERT INTO users (username,fullName,email,password)
                VALUES
                (?,?,?,?)
            `,values)
            res.json({message:"Success"});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Success"});
        }
    }
    

}






const handleLogin = async(req , res) => {
    const {loginUsername,loginPassword} = req.body;
    console.log(loginUsername,loginPassword);
    let user = loginUsername;
    let pwd = loginPassword;
    if(!user||!pwd)return res.status(500).send("There is some problem in the retrieving process.");
    let userFind;
    try {
        // ! We cannot define userFind inside try as it becomes invisible outside
        // * The double bracket onnly reeturns the first value.
        [[userFind]] = await db.execute(` 
            SELECT * FROM users WHERE username = ?;
        `, [user])
    } catch (error) {
        console.log(`Database Error: ${error}`);
         return res.status(500).send("There is some problem in the database.")
    }
    // * If user is not found
    if(!userFind) return res.sendStatus(401); // * Unauthorised


    // ! If user is find we will match the pwd given with the already hashed password
    const match = await bcrypt.compare(pwd, userFind.password); //* because bcrypt password are one way we cannot decrypt a hashed password instead becrypt.compare rehashes the new input and checks if the results are identical.
    //* securely verifies if a plain text password matches a stored hashed password.
    
    // ! If matched then we will create a access token and a refresh token
    if(match) {
        const accessToken = jwt.sign(
            { "username": userFind.username }, // * We only take username because it's a jwt token and it can be accessible to all and we don't want some sucker to have those juicy passwords
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": userFind.username },
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
            SET passkey = ?
            WHERE username = ?;
        `,[refreshToken,user])
        res.cookie('jwt', refreshToken, {httpOnly:true, maxAge: 24*60*60*1000});
        return res.json({accessToken, redirectTo:'/'});

    } else {
        return res.sendStatus(401);
    }
    


    
}



export {userSignup, handleLogin};