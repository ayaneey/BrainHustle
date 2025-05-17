// components/Dashboard/Sidebar/AffirmationQuote.jsx
"use client";

import React, { useEffect, useState } from "react";

const AffirmationQuote = () => {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");

	useEffect(() => {
		const fetchQuote = async () => {
			try {
				const res = await fetch("/api/quote");
				if (!res.ok) throw new Error("Failed to fetch quote");
				const data = await res.json();
				setQuote(data.q);
				setAuthor(data.a);
			} catch (err) {
				console.error("Quote fetch failed:", err);
			}
		};

		fetchQuote();
	}, []);

	return (
		<div className="bg-white rounded-xl p-6 shadow-lg text-baseBlack">
			<h2 className="text-lg font-bold mb-4 border-b pb-2">
				🌟 Quote of the Day
			</h2>
			{quote ? (
				<>
					<p className="italic mb-2 text-secondTextColor">"{quote}"</p>
					<p className="text-right font-medium text-baseBlack">— {author}</p>
				</>
			) : (
				<p className="text-sm text-secondTextColor">Loading quote...</p>
			)}
		</div>
	);
};

export default AffirmationQuote;
