import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();
    }catch (error) {
        return res.status(401).json({
            message: "Invalid or expired session",
        });
    }
};
    