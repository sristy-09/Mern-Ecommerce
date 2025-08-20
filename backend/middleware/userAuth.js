import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsynError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new HandleError(
        "Authentication is missing! Please login to access resource",
        401
      )
    );
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData.id);
  next();
});

// roleBasedAccess('admin','superadmin') and for accesing these data we use (...roles)
export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    // when roles is admin and req.user.role is user. This if clause checks for this condition.
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Role - ${req.user.role} is not allowed to access the resource`,
          403
        )
      );
    }
    next();
  };
};
