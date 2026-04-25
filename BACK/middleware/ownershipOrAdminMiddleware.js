import { UnauthorizedError } from "../utils/errors.js";

const ownershipOrAdminMiddleware = (req, res, next) => {
  const isAdmin = req.user.role === "admin";
  const isOwner = req.user._id === req.params.id;

  if (!isAdmin && !isOwner) {
    throw new UnauthorizedError("soz you arent allowed");
  }

  next();
};

export default ownershipOrAdminMiddleware;
