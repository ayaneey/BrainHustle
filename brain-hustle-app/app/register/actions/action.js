import prisma from "../../../libs/prismadb";
import { z } from "zod";

const schema = z.object({
	email: z.string({
		message: "Invalid Email",
	}),
	password: z.string({
		message: "Invalid Password",
	}),
	name: z.string({
		message: "Invalid Name",
		check: (value) => value.length > 0 || "Name is required",
	}),
});

async function createUser(prevState, formData) {
	const validatedFields = schema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
		name: formData.get("name"),
	});

	// Return early if the form data is invalid
	if (!validatedFields.success) {
		return { message: " failed to complete" };
	}

	try {
		// Check if the email is already registered
		const isEmailRegistered = await prisma.User.findUnique({
			where: {
				email: formData.get("email"),
			},
		});
		if (isEmailRegistered) {
			return {
				message: "Email already registered",
			};
		}

		// Create the user
		const newUser = await prisma.User.create({
			data: {
				email: formData.get("email"),
				password: formData.get("password"),
				name: formData.get("name"),
			},
		});
		return {
			message: "User created successfully",
			user: newUser,
		};
	} catch (err) {
		return {
			message: "Something went wrong",
		};
	}
}

export default createUser;
