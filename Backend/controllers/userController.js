// import userModel from "../models/userModel.js";
// import validator from "validator";
// import bcrypt from 'bcrypt';


// const loginUser = async (req,res) => {
    
// }

// // route for user register

// const registerUser = async (req,res) => {
//     try {
//         const [name,email,password] = req.body;
//         // checking user already exite or not

//         const exists = await userModel.findOne({email})

//         if (exists) {
//             return res.json({success:false, message:"User allready exists"})
//         }

//         // validating email format & strong passowrd

//         if (!validator.isEmail(email)) {
//             return res.json({success:false, message:"Please enter the valid email"})
            
//         }
//         if (password.length < 8) {
//             return res.json({success:false, message:"Please enter Strong password"})
  
//         }


//     } catch (error) {
        
//     }
    

// }

// // route for admin login

// const adminLogin = async (req,res) => {


// }

// export {loginUser, registerUser, adminLogin} 

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


// ADMIN LOGIN
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    // Hardcoded admin login (No JWT)
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.json({ success: true, message: "Admin login success" });
    }

    return res.json({ success: false, message: "Invalid admin credentials" });
};
