// import { Pool } from "pg";

import { MONGO_URI } from "@configs/config";
import { User } from "@models/user";
import mongoose from "mongoose";

// const pool = new Pool();

export const init = async () => {
  await mongoose.connect(MONGO_URI);

  console.log("Connected to MongoDB");

  const user = {
    id: 1,
    name: "Admin",
    email: "admin",
    password: "$2a$10$KUBnd5W..o7RLfSN8gMlFO1Ub9fm5iCjPHYifCGnz6LY.KnbND9h6",
    type: "admin",
  };

  try {
    await User.findOneAndUpdate({ id: 1 }, user, { upsert: true });
    console.log("Admin created");
  } catch (e) {
    console.log(e);
  }
};
