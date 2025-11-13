import { Schema, model } from "mongoose";

const creditSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Credit = model("Credit", creditSchema);
