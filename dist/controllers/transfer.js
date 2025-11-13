"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.creditController = exports.transferController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_1 = require("../models/transaction");
const user_1 = require("../models/user");
const credit_1 = require("../models/credit");
/**
 * Transfer funds from sender (params.id) to receiver (body.receiver).
 * Uses a mongoose transaction to ensure atomicity.
 */
const transferController = async (req, res) => {
    const senderId = req.params.id;
    const { receiver, amount } = req.body;
    const amt = Number(amount);
    if (Number.isNaN(amt) || amt <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }
    try {
        // 1️⃣ Find sender by ID
        const sender = await user_1.User.findById(senderId);
        if (!sender) {
            return res.status(404).json({ message: "Sender not found" });
        }
        // 2️⃣ Check sufficient balance
        if (sender.accountBalance < amt) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        // 3️⃣ Deduct the amount from sender’s balance
        sender.accountBalance -= amt;
        await sender.save();
        // 4️⃣ Create transfer record (receiver is a string)
        const transaction = await transaction_1.Transfer.create({
            sender: sender._id,
            receiver, // now a string
            amount: amt,
        });
        return res.status(201).json({
            message: "Transfer successful",
            transaction,
            newBalance: sender.accountBalance,
        });
    }
    catch (error) {
        console.error("Error transferring funds:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.transferController = transferController;
/**
 * Credit (top-up) a user's account (params.id) by `amount`.
 * Creates a Credit record with the credited amount (not the new balance).
 */
const creditController = async (req, res) => {
    const userId = req.params.id;
    const { sender, amount } = req.body;
    const amt = Number(amount);
    if (Number.isNaN(amt) || amt <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }
    if (!mongoose_1.default.isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user id" });
    }
    try {
        const user = await user_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.accountBalance += amt;
        await user.save();
        // Save the credit transaction with the credited amount
        const transaction = await credit_1.Credit.create({
            sender,
            receiver: user._id,
            amount: amt,
        });
        return res.status(201).json({
            message: "Credit successful",
            transaction,
            newBalance: user.accountBalance,
        });
    }
    catch (error) {
        console.error("Error crediting funds:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.creditController = creditController;
/**
 * Get all transactions for a user (both transfers where user is sender
 * and credits where user is receiver), merge and sort by most recent.
 */
const getTransactions = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose_1.default.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid user id" });
        }
        // Fetch both lists (you can .limit() or paginate if needed)
        const transfers = await transaction_1.Transfer.find({ sender: userId }).lean();
        const credits = await credit_1.Credit.find({ receiver: userId }).lean();
        // Normalize timestamp field: prefer createdAt, fallback to timestamp
        const extractTime = (doc) => {
            // createdAt might be present if schema uses timestamps: true
            if (doc.createdAt)
                return new Date(doc.createdAt).getTime();
            if (doc.timestamp)
                return new Date(doc.timestamp).getTime();
            // fallback to Date.now() so it doesn't crash (but such items will be treated as newest)
            return Date.now();
        };
        // Add a type field so client can distinguish
        const mappedTransfers = transfers.map((t) => ({
            ...t,
            __type: "transfer",
        }));
        const mappedCredits = credits.map((c) => ({ ...c, __type: "credit" }));
        const all = [...mappedTransfers, ...mappedCredits];
        all.sort((a, b) => extractTime(b) - extractTime(a));
        return res.status(200).json({
            message: "Transactions fetched successfully",
            transactions: all,
        });
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getTransactions = getTransactions;
