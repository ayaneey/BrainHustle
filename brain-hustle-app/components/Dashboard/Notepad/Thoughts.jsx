"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import jwt from "jsonwebtoken";

const Thoughts = () => {
	// State to store the note
	const [note, setNote] = useState("");
	const [userId, setUserId] = useState(null);

	/****** This section is the AUTHENTICATION CHECK: It checks for user login status ******/
	useEffect(() => {
		// Get token from cookie
		const token = document.cookie
			// Split cookies into array at semicolon+space
			.split("; ")
			// Find cookie that starts with "token="
			.find((row) => row.startsWith("token="))
			// Split found cookie at "=" and take second part (the value)
			?.split("=")[1];

		// If token is found...
		if (token) {
			// Decode JWT token to get user information
			const decoded = jwt.decode(token);
			// Save user ID from token to state
			setUserId(decoded.userId);
		}
	}, []); // Empty array means run once when component mounts

	/****** This section is the FETCH USER DATA: Gets User's Notes ******/
	useEffect(() => {
		if (userId) {
			fetch(`/api/thoughts/${userId}`)
				.then((res) => res.json())
				.then((data) => {
					if (data?.text) {
						setNote(data.text); // Set the latest note's text
					} else {
						console.log("No note found, setting empty");
						setNote(""); // No note found, set an empty value
					}
				})
				.catch((err) => {
					console.error("Error fetching note:", err);
					setNote(""); // Reset note on error
				});
		}
	}, [userId]);

	// Handle form submission - needs async because we're using await with fetch
	const handleSubmit = async () => {
		// Check if note is empty or just whitespace
		if (!note.trim()) {
			console.error("Note is empty, not submitting");
			return; // Exit function if note is empty
		}

		try {
			// Send POST request to our API with the note
			const response = await fetch(`/api/thoughts/${userId}`, {
				method: "POST", // Specify HTTP method
				headers: {
					"Content-Type": "application/json", // Tell API we're sending JSON
				},
				body: JSON.stringify({ text: note }), // Convert note to JSON string
			});

			const data = await response.json();
			if (response.ok) {
				console.log("Note saved successfully:", data);
				alert("Note saved!");
			} else {
				console.error("Error saving note:", data.message);
			}
		} catch (error) {
			console.error("Error submitting note:", error);
		}
	};

	return (
		<div className="bg-gray-400/50 shadow-lg rounded-lg p-4 w-full h-full max-w-xl">
			<h2 className="text-xl font-bold mb-2">Notepad</h2>
			<textarea
				className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-[18px]"
				placeholder="Type your notes here..."
				value={note}
				onChange={(e) => setNote(e.target.value)}
			/>

			<Button
				color="primary"
				type="button"
				size="sm"
				className="md:w-auto"
				onClick={handleSubmit}
			>
				Save
			</Button>
		</div>
	);
};

export default Thoughts;
