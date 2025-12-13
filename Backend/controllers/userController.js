

import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

// USER REGISTER
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields required" });
        }

        // Check if user exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Email validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        // Password validation
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.json({ success: true, message: "User registered successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


// USER LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        return res.json({ success: true, message: "Login success", user });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


import jwt from "jsonwebtoken";

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check admin credentials
        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            // Create JWT token
            const token = jwt.sign(
                { admin: true, email },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            return res.json({
                success: true,
                message: "Admin login success",
                token
            });
        }

        // If invalid credentials
        return res.json({ success: false, message: "Invalid admin credentials" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};
