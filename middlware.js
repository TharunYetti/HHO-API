import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const middleware = (req, res, next) => {
    try {

        const authHeader = req.headers['authorization'];// console.log(authHeader);
        // Format: "Bearer TOKEN"
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(400).send("Token Not Found....");
        }

        let decode = jwt.verify(token, JWT_SECRET_KEY);
        console.log(decode);
        req.user = decode.user;
        next();
    } catch (error) {
        return res.status(400).send(error.message+"in Middleware");
    }
}


