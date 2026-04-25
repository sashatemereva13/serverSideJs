import { UnauthorizedError } from "../utils/errors.js";

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new UnauthorizedError("Admins only , soz :(");
  }
  next();
};

export default adminMiddleware;
