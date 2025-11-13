import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  accountNumber: string;
  accountBalance: number;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
