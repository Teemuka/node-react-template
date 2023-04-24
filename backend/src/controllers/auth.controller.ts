import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../configs/config";
import { User } from "@models/user";
import { NextFunction, Request, Response } from "express";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    } else {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const tokenData = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
          },
        };

        const token = jwt.sign(tokenData, config.TOKEN_SECRET, {
          expiresIn: config.TOKEN_EXPIRATION,
        });

        const refreshToken = jwt.sign(tokenData, config.REFRESH_TOKEN_SECRET, {
          expiresIn: config.REFRESH_TOKEN_EXPIRATION,
        });

        res.status(200).send({ token, refreshToken, ...tokenData });
      } else {
        res.status(400).send("Invalid Credentials");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
  next();
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    console.log(refreshToken);
    jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).send({
            message: "Refresh token expired! You must login again",
          });
        }

        return res.status(403).send({
          message: "Refresh token is not valid!",
        });
      }

      const user = decoded.user;

      const token = jwt.sign({ user }, config.TOKEN_SECRET, {
        expiresIn: config.TOKEN_EXPIRATION,
      });

      res.status(200).send({ token, refreshToken });

      next();
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
  next();
};
