import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Set the salt rounds for bcrypt hashing
const saltRounds = 10;

// Creating a new instance of the PrismaClient
const prisma = new PrismaClient();

export default async function handler(req, res) {
	// Check if the request method is POST
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		// Extract data from the request body (name, email, and password)
		const { name, email, password } = req.body;

		// If any of the required fields are missing, return an error
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Name, email, and password are required" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Here we create a new user in the database using the create method
		await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		});

		// If the user is created successfully, return a success message else return an error message
		return res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:", error);
		return res.status(500).json({ message: "Error registering user" });
	}
}
