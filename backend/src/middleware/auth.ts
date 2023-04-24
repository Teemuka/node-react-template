import { config } from "@configs/config";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers["Authorization"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  token = token.split(" ")[1] || token;

  jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Token expired!",
        });
      }

      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.user = decoded.user;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  const isAdmin = req.user?.type === "admin";

  if (!isAdmin) {
    return res.status(403).send({
      message: "Require Admin Role!",
    });
  }

  next();
};
