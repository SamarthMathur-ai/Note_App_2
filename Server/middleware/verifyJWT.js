import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const cookies = req.cookies; // * req.cookies is an object containing all cookies the browser sent with request. cookie-parser middleware is wat makes this available+
    console.log("Cookies received:", cookies); // ← add this
    console.log("JWT cookie:", cookies?.jwt);  // ← add this
    
    if (!cookies?.jwt) return res.redirect('/login');// * uses optional chaining- it safely checks if cookies exists and has a jwt property.

    jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {// * cookies.jwt-the actual refresh token string stored in the cookie   and the other thing is the secret key used to verify it wasn't tampered with.
        if (err) return res.redirect('/login');
        req.user = decoded.username; // * if tooken is valid decoded contains whatever you stored in it during login.
        next();
    });
};

export default verifyJWT;