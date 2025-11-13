import { Request, Response } from "express";
import { User } from "../models/user";
import generateRoutingNumber from "../utils/routing_number";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a unique routing/account number
    let accountNumber = generateRoutingNumber();
    let existingAccount = await User.findOne({ accountNumber });

    // Keep generating until it's unique
    while (existingAccount) {
      accountNumber = generateRoutingNumber();
      existingAccount = await User.findOne({ accountNumber });
    }

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password,
      accountNumber,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Implement user login logic here
    const { username, password } = req.body;

    // Find the user by email or account number
    const user = await User.findOne({
      $or: [{ email: username }, { accountNumber: username }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password
    if (user.password === password) {
      return res.status(200).json({ message: "Login successful", user });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
