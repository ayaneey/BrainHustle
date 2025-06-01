"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const AffirmationQuote = () => {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchQuote = async () => {
			try {
				setIsLoading(true);
				const res = await fetch("/api/quote");
				if (!res.ok) throw new Error("Failed to fetch quote");
				const data = await res.json();
				setQuote(data.q);
				setAuthor(data.a);
			} catch (err) {
				console.error("Quote fetch failed:", err);
				// Fallback quote if API fails
				setQuote(
					"You don't have to be great to start, but you have to start to be great."
				);
				setAuthor("Zig Ziglar");
			} finally {
				setIsLoading(false);
			}
		};

		fetchQuote();
	}, []);

	return (
		<div className="bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm border border-white/20 rounded-xl sm-phone:rounded-2xl p-4 sm-phone:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
			<div className="flex items-center gap-2 sm-phone:gap-3 mb-4 sm-phone:mb-6">
				<div className="w-8 h-8 sm-phone:w-10 sm-phone:h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg sm-phone:rounded-xl flex items-center justify-center">
					<Star className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 text-white" />
				</div>
				<h2 className="text-lg sm-phone:text-xl font-bold text-baseBlack">
					Quote of the Day
				</h2>
			</div>

			{isLoading ? (
				<div className="animate-pulse space-y-3 sm-phone:space-y-4">
					<div className="h-3 sm-phone:h-4 bg-gray-200 rounded mb-2"></div>
					<div className="h-3 sm-phone:h-4 bg-gray-200 rounded w-3/4 mb-3 sm-phone:mb-4"></div>
					<div className="h-2 sm-phone:h-3 bg-gray-200 rounded w-1/2 ml-auto"></div>
				</div>
			) : quote ? (
				<div className="space-y-3 sm-phone:space-y-4">
					<blockquote className="italic text-sm sm-phone:text-base leading-relaxed text-secondTextColor">
						"{quote}"
					</blockquote>
					<p className="text-right font-medium text-sm sm-phone:text-base text-baseBlack">
						— {author}
					</p>
				</div>
			) : (
				<div className="flex items-center justify-center py-8">
					<p className="text-sm sm-phone:text-base text-secondTextColor">
						Unable to load quote. Please try refreshing the page.
					</p>
				</div>
			)}
		</div>
	);
};

export default AffirmationQuote;
