import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email}
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "TECHNICIAN",
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }

        });

        res.status(201).json(user);

    } catch(error){
        console.error(error);

        res.status(500).json({
            message: "Failed to register user",
        })

    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
           return res.status(401).json({
             message: "Invalid email or password",
           });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to login",
        });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        
        res.json(user);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get current user",
        });
    }
};

export const logout = (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
    });

    res.json({
        message: "Logged out successfully",
    });
}
