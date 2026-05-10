import jwt from 'jsonwebtoken';
import 'dotenv/config';


// ! We are making a middleware here
// ! We are making a middleware so as to check every user accessing the protected route.
const verifyJWT = (req, res, next)=>{
    const authHeader = req.headers['authorization'];  //* this check the header of the http request so as to check if authorization is written on it
    if(!authHeader) return res.sendStatus(401); // * Unauthorised access
    console.log(authHeader); // * Bearer Token The bearer token is something like this "Bearer eyJhbGciOiJIUzI1..." 
    const token = authHeader.split(' ')[1]; // * SO basically it split at space and take the second elemenet.
    jwt.verify(
        token,                                  
        process.env.ACCESS_TOKEN_SECRET, // * Simply using the secret key to verify the token;
        (err, decoded) => {
            if(err) return res.sendStatus(403); // * HTTP  understands the request but refuses to authorize it .
            req.user = decoded.username; //* If good then the decoded.username is stored in req.user;
            next();
        }
    )
}

export {verifyJWT};