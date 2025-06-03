import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req) {
	const body = await req.json();
	const { userId, subject, score, date } = body;

	try {
		const newResult = await prisma.quizResult.create({
			data: {
				userId,
				subject,
				score,
				date: new Date(date || Date.now()),
			},
		});

		return NextResponse.json(newResult);
	} catch (error) {
		console.error("Error creating quiz result:", error);
		return NextResponse.json(
			{ error: "Failed to save quiz result" },
			{ status: 500 }
		);
	}
}

export async function GET(req) {
	console.log("Request received at /api/quizResults");

	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("userId");

	if (!userId) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	try {
		const results = await prisma.quizResult.findMany({
			where: { userId },
			orderBy: { date: "desc" }, // Newest first
		});

		console.log(`Found ${results.length} quiz results for user ${userId}`);
		return NextResponse.json(results);
	} catch (error) {
		console.error("Error fetching quiz results:", error);
		return NextResponse.json(
			{ error: "Failed to fetch quiz results" },
			{ status: 500 }
		);
	}
}
