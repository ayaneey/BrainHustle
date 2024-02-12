import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Instantiate Prisma client
const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		// Extract data from the request body
		const { email, password } = req.body;

		// Perform any necessary validation on the input data
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		// Query the user by email
		const user = await prisma.user.findUnique({
			where: { email },
		});

		// Check if the user exists
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Compare the provided password with the hashed password stored in the database
		const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

		// Check if the passwords match
		if (!passwordMatch) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		// If everything is successful, return a success response
		return res.status(200).json({ message: "Login successful" });
	} catch (error) {
		console.error("Error logging in:", error);
		return res.status(500).json({ message: "Error logging in" });
	}
}
