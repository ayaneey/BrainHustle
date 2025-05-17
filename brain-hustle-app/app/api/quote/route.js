// app/api/quote/route.js
export async function GET() {
	try {
		const res = await fetch("https://zenquotes.io/api/today", {
			cache: "no-store", // ensures it's not cached
		});
		if (!res.ok) {
			return new Response(JSON.stringify({ error: "Failed to fetch quote" }), {
				status: 500,
			});
		}
		const data = await res.json();
		return new Response(JSON.stringify(data[0]), {
			headers: { "Content-Type": "application/json" },
			status: 200,
		});
	} catch (error) {
		console.error("Quote API error:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
		});
	}
}
