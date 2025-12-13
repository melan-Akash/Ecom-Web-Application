import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        // Check token provided
        if (!token) {
            return res.json({
                success: false,
                message: "Not authorized. Login again"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token belongs to admin
        if (!decoded.admin) {
            return res.json({
                success: false,
                message: "Access denied. Admin only"
            });
        }

        // Attach admin data (optional)
        req.admin = decoded;

        // Continue to next handler
        next();

    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default adminAuth;
