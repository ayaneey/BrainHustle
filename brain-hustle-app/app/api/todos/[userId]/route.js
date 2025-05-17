import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req, context) {
	const { userId } = await auth(); // Clerk authenticated user
	const requestedId = context.params.userId; // correct dynamic param usage

	if (!userId || userId !== requestedId) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const todos = await prisma.toDo.findMany({
			where: { userId },
		});
		return new Response(JSON.stringify(todos), { status: 200 });
	} catch (error) {
		console.error("GET /todos error:", error);
		return new Response(JSON.stringify({ message: "Error fetching todos" }), {
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
		const { text } = await req.json();

		if (!text || typeof text !== "string") {
			return new Response(JSON.stringify({ message: "Invalid input" }), {
				status: 400,
			});
		}

		const newTodo = await prisma.toDo.create({
			data: { text, userId },
		});

		return new Response(JSON.stringify(newTodo), { status: 200 });
	} catch (error) {
		console.error("POST /todos error:", error);
		return new Response(JSON.stringify({ message: "Error creating todo" }), {
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
			return new Response(JSON.stringify({ message: "Missing todo ID" }), {
				status: 400,
			});
		}

		const deleted = await prisma.toDo.deleteMany({
			where: { id, userId },
		});

		return new Response(JSON.stringify({ message: "Deleted", deleted }), {
			status: 200,
		});
	} catch (error) {
		console.error("DELETE /todos error:", error);
		return new Response(JSON.stringify({ message: "Error deleting todo" }), {
			status: 500,
		});
	}
}
