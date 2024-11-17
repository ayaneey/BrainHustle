import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Middleware to get userId from token
const getUserId = () => {
	const token = cookies().get("token")?.value;
	if (!token) return null;
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded.userId;
	} catch (error) {
		return null;
	}
};

export async function GET() {
	const userId = getUserId();
	if (!userId) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const todos = await prisma.toDo.findMany({
			where: { userId: userId },
		});
		return new Response(JSON.stringify(todos), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ message: "Error fetching todos" }), {
			status: 500,
		});
	}
}

export async function POST(req) {
	const userId = getUserId();
	if (!userId) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const { text } = await req.json();
		const newTodo = await prisma.toDo.create({
			data: {
				text,
				userId,
			},
		});
		return new Response(JSON.stringify(newTodo), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ message: "Error creating todo" }), {
			status: 500,
		});
	}
}

export async function DELETE(req) {
	const userId = getUserId();
	if (!userId) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			status: 401,
		});
	}

	try {
		const { id } = await req.json();
		const deletedTodo = await prisma.toDo.deleteMany({
			where: {
				id,
				userId, // Ensure user can only delete their own todos
			},
		});
		return new Response(JSON.stringify({ message: "Successfully deleted" }), {
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ message: "Error deleting todo" }), {
			status: 500,
		});
	}
}
