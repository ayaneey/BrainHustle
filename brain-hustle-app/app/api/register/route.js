import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
	try {
		// Parse the request body
		const body = await req.json();
		const { email, password, name } = body;
		console.log(email, password);

		// Validate the input data
		if (!email || !password) {
			return NextResponse.json(
				{ message: "Email and password are required" },
				{ status: 400 }
			);
		}

		// Check for an existing user with the same email
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ message: "Email already exists" },
				{ status: 400 }
			);
		}

		// Hash the password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create a new user in the database
		const user = await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		});

		// If user creation is successful, return a success message
		return NextResponse.json(
			{ message: "Signup successful", user },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error signing up:", error);
		return NextResponse.json({ message: "Error signing up" }, { status: 500 });
	} finally {
		// Disconnect Prisma client to prevent memory leaks
		await prisma.$disconnect();
	}
}
