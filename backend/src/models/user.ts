import { Schema, model } from "mongoose";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  type: string;
}

const userSchema = new Schema<IUser>({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    dropDups: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
});

export const User = model<IUser>("User", userSchema);
