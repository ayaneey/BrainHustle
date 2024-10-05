import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

// Creating a new instance of the PrismaClient
const prisma = new PrismaClient();

/* This GET method is used to fetch all the journal entries for a user */

export async function GET(req) {
	// Step 1: Check if user is logged in
	const session = await getSession({ req });

	// If user is not logged in, return an error message
	if (!session) {
		return NextResponse.json({ message: "Unauthorised" }, { status: 401 }); // 401 means authentication credentials received are not authorised
	}

	// Get the user's email from the session
	const userEmail = session.user.email;

	// Now fetch the user's journal from the database (prisma)
	const journal = await prisma.journal.findUnique({
		where: { userEmail },
	});

	// Return the journal entry to the client
	return NextResponse.json(journal);
}

/* This POST method is used to save or update the journal for the user */

export async function POST(req) {
	// Step 1 - Check if the user is logged in
	const session = await getSession({ req });

	// If user is not logged in, return an error message
	if (!session) {
		return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
	}

	// Get user's email from Session
	const userEmail = session.user.email;
}
