import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "Authentication token missing. Please login again."
            })
        }
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser;
        next();
    } catch (err) {
        res.status(500).json({
            message: "Please Login Again" + err
        })
    }
}
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

export { authMiddleware, authorizeRole };