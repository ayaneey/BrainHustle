// app/api/quote/route.js
import quotes from "./quotes.json";

export async function GET() {
	// Get the current day as a number (e.g. 17)
	const today = new Date();
	const dayOfYear = today.getDate() + today.getMonth() * 31; // Simple way to spread days across year

	// Pick a quote based on that day
	const quoteOfTheDay = quotes[dayOfYear % quotes.length];

	return new Response(JSON.stringify(quoteOfTheDay), {
		headers: { "Content-Type": "application/json" },
		status: 200,
	});
}
