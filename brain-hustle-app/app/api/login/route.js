import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const body = await req.json();
		const { email, password } = body;

		// Check if email and password are provided
		if (!email || !password) {
			return NextResponse.json(
				{ message: "Email and password are required" },
				{ status: 400 }
			);
		}

		// Find the user by email
		const user = await prisma.user.findUnique({ where: { email } });

		// Check if user exists
		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		// Compare the entered password with the hashed password
		const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

		// If password doesn't match, return an error
		if (!isPasswordMatch) {
			return NextResponse.json(
				{ message: "Incorrect password" },
				{ status: 401 }
			);
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			process.env.JWT_SECRET, // Use an environment variable for your secret key
			{ expiresIn: "7d" } // Token expiration time
		);

		// Set the token as a cookie using Next.js cookies API
		cookies().set("token", token, {
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
			maxAge: 60 * 60 * 24 * 7, // 1 week
		});

		// Return response
		return NextResponse.json({ message: "Login successful" }, { status: 200 });
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json({ message: "Error logging in" }, { status: 500 });
	}
}
