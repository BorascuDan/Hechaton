import jwt from "jsonwebtoken";

export function sendJsonResponse(res, success, status, message, data) {
    res.status(status).json({ success: success, message: message, data: data });
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return sendJsonResponse(res, false, 401, "Access denied", null);
    }
    
      req.user = token;
      next();

  };