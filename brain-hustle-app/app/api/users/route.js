// app/api/users/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
	try {
		const users = await prisma.user.findMany();
		return new Response(JSON.stringify(users), { status: 200 });
	} catch (error) {
		return new Response("An error occurred while fetching users", {
			status: 500,
		});
	}
}
