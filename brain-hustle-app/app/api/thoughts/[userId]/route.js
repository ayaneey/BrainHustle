import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req, context) {
	const { userId } = await auth();
	const requestedId = context.params.userId;

	if (!userId || userId !== requestedId) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const latestThought = await prisma.thoughts.findFirst({
			where: { userId },
			orderBy: { createdAt: "desc" },
		});

		return new Response(JSON.stringify(latestThought || {}), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("GET /thoughts error:", error);
		return new Response(JSON.stringify({ message: "Error fetching thought" }), {
			status: 500,
		});
	}
}

export async function POST(req, context) {
	const { userId } = await auth();
	const requestedId = context.params.userId;

	if (!userId || userId !== requestedId) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const body = await req.json();

		if (!body.text || typeof body.text !== "string") {
			return new Response(
				JSON.stringify({ message: "Text must be a non-empty string." }),
				{ status: 400 }
			);
		}

		const newThought = await prisma.thoughts.create({
			data: { text: body.text, userId },
		});

		return new Response(JSON.stringify(newThought), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("POST /thoughts error:", error);
		return new Response(JSON.stringify({ message: "Error saving thought" }), {
			status: 500,
		});
	}
}

export async function DELETE(req, context) {
	const { userId } = await auth();
	const requestedId = context.params.userId;

	if (!userId || userId !== requestedId) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const { id } = await req.json();

		if (!id) {
			return new Response(JSON.stringify({ message: "Missing ID" }), {
				status: 400,
			});
		}

		const deleted = await prisma.thoughts.deleteMany({
			where: { id, userId },
		});

		return new Response(
			JSON.stringify({ message: "Thought deleted", deleted }),
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error("DELETE /thoughts error:", error);
		return new Response(JSON.stringify({ message: "Error deleting thought" }), {
			status: 500,
		});
	}
}
