import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import { UnauthorizedError } from "../utils/errors.js";

// reads authorisation header
// checks for Bearer token
// verifies the token
// puts decoded user info inside request
// blocks access for invalid tokens

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch the user from DB
    const user = await Student.findById(decoded.sub).select("-password");

    if (!user) {
      throw new UnauthorizedError("User no longer exists");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError("invalid or expired token"));
  }
};

export default authMiddleware;
