import express from "express";
import { init } from "./db";

import { verifyToken } from "./middleware/auth";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { config } from "@configs/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/auth", authRoutes);

if (config.AUTH === "true") {
  app.use("/api", verifyToken);
}

app.use("/api/user", userRoutes);

if (config.TOKEN_SECRET && config.REFRESH_TOKEN_SECRET) {
  init().then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}.`);
    });
  });
} else {
  console.log("TOKEN_SECRET is missing");
  process.exit(1);
}
