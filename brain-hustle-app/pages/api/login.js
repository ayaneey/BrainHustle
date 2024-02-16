import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Creating a new instance of the PrismaClient
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

		// Query the user by email address from the database using the findUnique method
		const user = await prisma.user.findUnique({
			where: { email },
		});

		// Here we check if the user exists in the database or not and return an error if not found
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Here we compare the the password provided by the user with the hashed password stored in the database using the compare method
		const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

		// If the password does not match, return an error
		if (!passwordMatch) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		// If the password matches, return a success message to the user indicating that the login was successful if not return an error
		return res.status(200).json({ message: "Login successful" });
	} catch (error) {
		console.error("Error logging in:", error);
		return res.status(500).json({ message: "Error logging in" });
	}
}
