"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credit = void 0;
const mongoose_1 = require("mongoose");
const creditSchema = new mongoose_1.Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Credit = (0, mongoose_1.model)("Credit", creditSchema);
