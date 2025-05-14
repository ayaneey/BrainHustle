import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Step 1 - Initialise Prisma
const prisma = new PrismaClient();

// Step 2 - Authentication check (getUserId function)
const getUserId = () => {
	const token = cookies().get("token")?.value; // Finds the user's login token in cookies..sees if it exists
	if (!token) return null; // means if no token, stop here - user isn't logged in
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET); // if we have token, verify it
		return decoded.userId; // We specifically want just the userId for our database operations
	} catch (error) {
		return null; // returns null meaning it's treated like not logged in!
	}
};

// Step 3 - Create GET route: this checks if user is authenticated, fetches thoughts for specific user, returns if no thought
export async function GET(req, { params }) {
	// Added 'params' to access userId dynamically
	const userIdFromToken = getUserId(); // Fetch userId from the token
	const { userId } = params; // Get userId from the dynamic route parameter

	if (!userIdFromToken || userIdFromToken !== userId) {
		// Check if authenticated user matches the requested userId
		return new Response(JSON.stringify({ message: "Unauthorised" }), {
			status: 401,
		});
	}

	try {
		// Fetch the most recent note
		const latestThought = await prisma.thoughts.findFirst({
			where: { userId: userId }, // Filter only for this user's thoughts
			orderBy: { createdAt: "desc" }, // Sort by createdAt descending
		});

		return new Response(JSON.stringify(latestThought || {}), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Error fetching thoughts" }),
			{ status: 500 }
		);
	}
}

// Step 4 - POST route: checks if user is authenticated, gets text from request body, creates new thought in db or returns error message
export async function POST(req, { params }) {
	// Added 'params' to access userId dynamically
	const userIdFromToken = getUserId(); // Fetch userId from the token
	const { userId } = params; // Get userId from the dynamic route parameter

	if (!userIdFromToken || userIdFromToken !== userId) {
		// Check if authenticated user matches the requested userId
		return new Response(JSON.stringify({ message: "Unauthorised" }), {
			status: 401,
		});
	}

	try {
		const body = await req.json(); // Parse request body
		if (!body.text || typeof body.text !== "string") {
			// Validate text input
			return new Response(
				JSON.stringify({ message: "Invalid input. Text must be a string." }),
				{ status: 400 }
			);
		}

		const newThought = await prisma.thoughts.create({
			data: {
				text: body.text, // Save text field
				userId, // Use the userId from the route parameter
			},
		});

		return new Response(JSON.stringify(newThought), { status: 200 });
	} catch (error) {
		console.error("Error creating thoughts:", error);
		return new Response(
			JSON.stringify({
				message: "Error creating thoughts",
				error: error.message,
			}),
			{ status: 500 }
		);
	}
}

// Step 5 - DELETE route: checks if user is authenticated, receives thought ID to delete, removes thought from database if it belongs to user, returns success or error message
export async function DELETE(req) {
	const userId = getUserId();
	if (!userId) {
		return new Response(JSON.stringify({ message: "Unauthorised" }), {
			status: 401,
		});
	}

	try {
		const { id } = await req.json();
		const deletedThought = await prisma.thoughts.delete({
			where: {
				id,
				userId, // this ensures user can only delete their own thoughts
			},
		});

		return new Response(
			JSON.stringify({ message: "Successfully deleted thought" }),
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error("Error deleting thought:", error);
		return new Response(JSON.stringify({ message: "Error deleting thought" }), {
			status: 500,
		});
	}
}
