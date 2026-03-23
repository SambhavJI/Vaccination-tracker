import User from '../models/user.js';
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/mail.js"

dotenv.config();

const signup = async (req, res) => {
    try {
        const { name, phone, password, role, email } = req.body;

        if (!name || !phone || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (role && !["admin", "user"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            phone,
            password: hashedPassword,
            role,
            email
        });

        await sendEmail({
            to: newUser.email,
            subject: "Welcome 🎉",
            html: `
              <h2>Welcome ${newUser.name}</h2>
              <p>Your account was created successfully.</p>
            `,
        });

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (err) {
        res.status(500).json({ message: "An error occurred: " + err.message });
    }
}

const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: "No user found, please signup" });
        }

        const correctPass = await bcrypt.compare(password, user.password);
        if (!correctPass) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: user._id,
            phone: user.phone,
            role: user.role
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                name: user.name,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: "An error occurred: " + err.message });
    }
}

export { signup, login }