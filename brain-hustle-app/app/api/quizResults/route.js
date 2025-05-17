import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
	const body = await req.json();
	const { userId, subject, score, date } = body;

	const newResult = await prisma.quizResult.create({
		data: {
			userId,
			subject,
			score,
			date: new Date(date || Date.now()),
		},
	});

	return NextResponse.json(newResult);
}

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("userId");

	if (!userId) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	const results = await prisma.quizResult.findMany({
		where: { userId },
		orderBy: { date: "asc" },
	});

	return NextResponse.json(results);
}
