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
		const decoded = jwt.verify(token, process.env.JWT_SECRET); // if we have token, verify it. Take the token (from cookie) and check if its valid using our secret key. If valid 'decoded' will contain user info
		return decoded.userId; // We specifically want just the userId for our database operations
	} catch (error) {
		// the error catches if anything goes wrong e.g. invalid token, expired token etc.
		return null; // returns null meaning it's treated like not logged in!
	}
};

// Step 3 - Create GET route: this check if user is authenticated, fetches thoughts for specific user, returns if no thought
export async function GET() {
	const userId = getUserId();
	if (!userId) {
		return new Response(JSON.stringify({ message: "Unauthorised" }), {
			status: 401,
		});
	}
	try {
		const thoughts = await prisma.thoughts.findMany({
			where: { userId: userId },
		});
		return new Response(JSON.stringify(thoughts), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Error fetching thoughts" }),
			{
				status: 500,
			}
		);
	}
}

// Step 4 - POST route: checks if user is authenticated, gets text from request body, creates new thought in db or returns error message
export async function POST(req) {
	// req is where the text data comes from
	const userId = getUserId();
	if (!userId) {
		return new Response(JSON.stringify({ message: "Unauthorised" }), {
			status: 401,
		});
	}

	try {
		const { text } = await req.json();
		const newThought = await prisma.thoughts.create({
			data: {
				text,
				userId,
			},
		});
		return new Response(JSON.stringify(newThought), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Error creating thoughts" }),
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
