import { PrismaClient } from "@prisma/client";

// Creating a new instance of the PrismaClient
const prisma = new PrismaClient();

/******** This function GETS (retrieves) the existing to-do list items ********/
export async function GET() {
	try {
		// Fetch all to-do items from the database
		const todos = await prisma.toDo.findMany();

		// Send the retrieved to-dos with a status 200 (success)
		return new Response(JSON.stringify(todos), { status: 200 });
	} catch (error) {
		console.log("Error fetching todos:", error);

		// Send an error message with status 500 if something goes wrong
		return new Response(JSON.stringify({ message: "Error fetching todos" }), {
			status: 500,
		});
	}
}

/********* This function POSTS (creates new) to-do list items *********/
export async function POST(req) {
	try {
		// Get the 'text' from the request body
		const { text } = await req.json();

		// Check if the 'text' is actually being passed
		console.log("Text received for new to-do:", text);

		// Create a new todo in the database
		const newTodo = await prisma.toDo.create({ data: { text } });
		console.log("New to-do created:", newTodo); // Log the new to-do created

		// Send the new to-do with status 200 (success)
		return new Response(JSON.stringify(newTodo), { status: 200 });
	} catch (error) {
		console.log("Error creating new todo:", error); // Check what error is being logged here
		return new Response(JSON.stringify({ message: "Something went wrong" }), {
			status: 500,
		});
	}
}

/********* This function DELETES to-do list items *********/
import { ObjectId } from "mongodb";

export async function DELETE(req) {
	try {
		const { id } = await req.json(); // Get the ID from request body

		if (!id || !ObjectId.isValid(id)) {
			// Return a 400 error if the ID is missing or invalid
			return new Response(JSON.stringify({ message: "Invalid ID!" }), {
				status: 400,
			});
		}

		// Delete the to-do item by its ObjectID
		const deletedTodo = await prisma.toDo.delete({
			where: { id: id.toString() }, // Convert ObjectId to string if needed
		});

		return new Response(
			JSON.stringify({
				message: "Successfully deleted the to-do item!",
				deletedTodo,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error deleting todo:", error.message, error.stack);
		return new Response(JSON.stringify({ message: "Error deleting to-do!" }), {
			status: 500,
		});
	}
}
