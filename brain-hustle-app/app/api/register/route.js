import Prisma from "../../../libs/prismadb";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
	// If not a POST request, send a method not allowed error
	if (req.method !== "POST") {
		return NextResponse.json(
			{ message: "Method Not Allowed" },
			{ status: 405 }
		);
	}

	try {
		// Extract data from the request body
		const { email, password } = req.body;
		console.log(email, password);

		// Perform any necessary validation on the input data
		if (!email || !password) {
			return NextResponse.json({ message: "Email and password are required" });
		}

		// Check for existing user with the same email
		const existingUser = await Prisma.user.findUnique({
			where: { email },
		});

		// If user already exists, return an error
		if (existingUser) {
			return NextResponse.json({ message: "Email already exists" });
		}

		// Hash the password before storing it in the database
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		async function createUser(name, email, hashedPassword) {
			const user = await prisma.user.create({
				data: {
					name,
					email,
					hashedPassword,
				},
			});

			return user;
		}

		// If user creation is successful, return a success message
		return NextResponse.json({ message: "Signup successful" });
	} catch (error) {
		console.error("Error signing up:", error);
		// Return a generic error message for security reasons
		return NextResponse.json({ message: "Error signing up" });
	}
}
