import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req) {
	console.log("POST request received at /api/calendarEvents");

	try {
		const body = await req.json();
		console.log("Request body:", body);

		const { userId, title, time, date } = body;

		if (!userId || !title || !date) {
			console.error("Missing required fields:", { userId, title, date });
			return NextResponse.json(
				{
					error:
						"Missing required fields: userId, title, and date are required",
				},
				{ status: 400 }
			);
		}

		const newEvent = await prisma.calendarEvent.create({
			data: {
				userId,
				title,
				time: time || null,
				date: new Date(date),
				createdAt: new Date(),
			},
		});

		console.log("Created calendar event:", newEvent);
		return NextResponse.json(newEvent, { status: 201 });
	} catch (error) {
		console.error("Error creating calendar event:", error);
		return NextResponse.json(
			{ error: "Failed to save calendar event", details: error.message },
			{ status: 500 }
		);
	}
}

export async function GET(req) {
	console.log("GET request received at /api/calendarEvents");

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

		const events = await prisma.calendarEvent.findMany({
			where: { userId },
			orderBy: { date: "asc" },
		});

		console.log(`Found ${events.length} calendar events for user ${userId}`);

		return NextResponse.json(events || [], { status: 200 });
	} catch (error) {
		console.error("Error fetching calendar events:", error);
		return NextResponse.json(
			{ error: "Failed to fetch calendar events", details: error.message },
			{ status: 500 }
		);
	}
}

export async function PUT(req) {
	console.log("PUT request received at /api/calendarEvents");

	try {
		const body = await req.json();
		console.log("PUT request body:", body);

		const { id, userId, title, time } = body;

		if (!id || !userId || !title) {
			console.error("Missing required fields for PUT:", { id, userId, title });
			return NextResponse.json(
				{ error: "Event ID, User ID, and title are required" },
				{ status: 400 }
			);
		}

		// Verify the event belongs to the user
		const existingEvent = await prisma.calendarEvent.findFirst({
			where: {
				id: id,
				userId: userId,
			},
		});

		if (!existingEvent) {
			console.error("Calendar event not found or unauthorized:", {
				id,
				userId,
			});
			return NextResponse.json(
				{ error: "Calendar event not found or unauthorized" },
				{ status: 404 }
			);
		}

		// Update the event
		const updatedEvent = await prisma.calendarEvent.update({
			where: { id: id },
			data: {
				title,
				time: time || null,
			},
		});

		console.log("Successfully updated calendar event:", id);
		return NextResponse.json(updatedEvent, { status: 200 });
	} catch (error) {
		console.error("Error updating calendar event:", error);
		return NextResponse.json(
			{ error: "Failed to update calendar event", details: error.message },
			{ status: 500 }
		);
	}
}

export async function DELETE(req) {
	console.log("DELETE request received at /api/calendarEvents");

	try {
		const body = await req.json();
		console.log("DELETE request body:", body);

		const { id, userId } = body;

		if (!id || !userId) {
			console.error("Missing required fields for DELETE:", { id, userId });
			return NextResponse.json(
				{ error: "Event ID and User ID are required" },
				{ status: 400 }
			);
		}

		// Verify the event belongs to the user
		const existingEvent = await prisma.calendarEvent.findFirst({
			where: {
				id: id,
				userId: userId,
			},
		});

		if (!existingEvent) {
			console.error("Calendar event not found or unauthorized:", {
				id,
				userId,
			});
			return NextResponse.json(
				{ error: "Calendar event not found or unauthorized" },
				{ status: 404 }
			);
		}

		// Delete the event
		await prisma.calendarEvent.delete({
			where: { id: id },
		});

		console.log("Successfully deleted calendar event:", id);
		return NextResponse.json(
			{ message: "Calendar event deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting calendar event:", error);
		return NextResponse.json(
			{ error: "Failed to delete calendar event", details: error.message },
			{ status: 500 }
		);
	}
}
