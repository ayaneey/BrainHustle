import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req) {
	console.log("POST request received at /api/quizResults");

	try {
		const body = await req.json();
		console.log("Request body:", body);

		const { userId, subject, score, maxScore, totalQuestions, date } = body;

		// Handle both maxScore and totalQuestions for compatibility
		const finalMaxScore = maxScore || totalQuestions || 20;

		console.log("Extracted values:", {
			userId,
			subject,
			score,
			maxScore: finalMaxScore,
			date,
		});

		if (!userId || !subject || score === undefined) {
			console.error("Missing required fields:", { userId, subject, score });
			return NextResponse.json(
				{
					error:
						"Missing required fields: userId, subject, and score are required",
				},
				{ status: 400 }
			);
		}

		const newResult = await prisma.quizResult.create({
			data: {
				userId,
				subject,
				score: parseInt(score),
				maxScore: parseInt(finalMaxScore),
				date: new Date(date || Date.now()),
			},
		});

		console.log("Created result:", newResult);
		return NextResponse.json(newResult, { status: 201 });
	} catch (error) {
		console.error("Error creating quiz result:", error);
		return NextResponse.json(
			{ error: "Failed to save quiz result", details: error.message },
			{ status: 500 }
		);
	}
}

export async function GET(req) {
	console.log("GET request received at /api/quizResults");

	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");

		console.log("UserId from params:", userId);

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const results = await prisma.quizResult.findMany({
			where: { userId },
			orderBy: { date: "desc" }, // Newest first
		});

		console.log(
			`Found ${results.length} quiz results for user ${userId}:`,
			results
		);

		// Always return an array, even if empty
		return NextResponse.json(results || [], { status: 200 });
	} catch (error) {
		console.error("Error fetching quiz results:", error);
		return NextResponse.json(
			{ error: "Failed to fetch quiz results", details: error.message },
			{ status: 500 }
		);
	}
}

export async function DELETE(req) {
	console.log("DELETE request received at /api/quizResults");

	try {
		const body = await req.json();
		console.log("DELETE request body:", body);

		const { id, userId } = body;

		if (!id || !userId) {
			console.error("Missing required fields for DELETE:", { id, userId });
			return NextResponse.json(
				{ error: "Quiz result ID and User ID are required" },
				{ status: 400 }
			);
		}

		// First verify the quiz result belongs to the user
		const existingResult = await prisma.quizResult.findFirst({
			where: {
				id: id,
				userId: userId,
			},
		});

		if (!existingResult) {
			console.error("Quiz result not found or unauthorized:", { id, userId });
			return NextResponse.json(
				{ error: "Quiz result not found or unauthorized" },
				{ status: 404 }
			);
		}

		// Delete the quiz result
		await prisma.quizResult.delete({
			where: {
				id: id,
			},
		});

		console.log("Successfully deleted quiz result:", id);
		return NextResponse.json(
			{ message: "Quiz result deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting quiz result:", error);
		return NextResponse.json(
			{ error: "Failed to delete quiz result", details: error.message },
			{ status: 500 }
		);
	}
}
