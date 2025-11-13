"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.loginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const routing_number_1 = __importDefault(require("../utils/routing_number"));
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists by email
        const existingUser = await user_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Generate a unique routing/account number
        let accountNumber = (0, routing_number_1.default)();
        let existingAccount = await user_1.User.findOne({ accountNumber });
        // Keep generating until it's unique
        while (existingAccount) {
            accountNumber = (0, routing_number_1.default)();
            existingAccount = await user_1.User.findOne({ accountNumber });
        }
        // Create the new user
        const newUser = await user_1.User.create({
            name,
            email,
            password,
            accountNumber,
        });
        return res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    try {
        // Implement user login logic here
        const { username, password } = req.body;
        // Find the user by email or account number
        const user = await user_1.User.findOne({
            $or: [{ email: username }, { accountNumber: username }],
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if the provided password matches the stored password
        if (user.password === password) {
            return res.status(200).json({ message: "Login successful", user });
        }
        else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.loginUser = loginUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await user_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await user_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getUserById = getUserById;
