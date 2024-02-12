import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Set the salt rounds for bcrypt
const saltRounds = 10;

// Instantiate Prisma client
const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		// Extract data from the request body
		const { name, email, password } = req.body;

		// Perform any necessary validation on the input data
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Name, email, and password are required" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Here you would use Prisma to create a new user with the hashed password
		await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		});

		// Simulating successful registration
		return res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:", error);
		return res.status(500).json({ message: "Error registering user" });
	}
}
