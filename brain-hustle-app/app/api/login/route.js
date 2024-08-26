import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

// Creating a new instance of the PrismaClient
const prisma = new PrismaClient();

export async function POST(req, res) {
	// if (req.method !== "POST") {
	// 	return res.status(405).json({ message: "Method Not Allowed" });
	// }

	try {
		// Extract data from the request body
		const body = await req.json();
		const { email, password } = body;
		console.log(email, password);

		// Perform any necessary validation on the input data
		if (!email || !password) {
			// return { message: "Email and password are required" };
			return NextResponse.json({ message: "Email and password are required" });
		}

		// Query the user by email address from the database using the findUnique method
		const user = await prisma.user.findUnique({
			where: { email },
		});

		// Here we check if the user exists in the database or not and return an error if not found
		if (!user) {
			// return { message: "User not found" };
			return NextResponse.json({ message: "User not found" });
		}

		// Here we compare the the password provided by the user with the hashed password stored in the database using the compare method
		const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

		// If the password does not match, return an error
		if (!passwordMatch) {
			// return { message: "Incorrect password" };
			return NextResponse.json({ message: "Incorrect password" });
		}

		// If the password matches, return a success message to the user indicating that the login was successful if not return an error
		// return res.status(200).json({ message: "Login successful" });
		return NextResponse.json({ message: "Login successful" });
	} catch (error) {
		console.error("Error logging in:", error);
		// return { message: "Error logging in" };
		return NextResponse.json({ message: "Error logging in" });
	}
}

// export async function POST() {
// 	const res = await

// 	const data = await res.json()

// 	return Response.json(data)
//   }
