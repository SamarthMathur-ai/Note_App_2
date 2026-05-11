import db from '../config/dbConnection.js';
import bcrypt from 'bcrypt';

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

export default userSignup;