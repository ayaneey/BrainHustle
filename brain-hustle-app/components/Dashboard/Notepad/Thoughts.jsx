"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";

const Thoughts = () => {
	const [note, setNote] = useState("");
	const [status, setStatus] = useState("");
	const { user } = useUser();

	useEffect(() => {
		if (!user || !user.id) return;

		const fetchNote = async () => {
			try {
				const res = await fetch(`/api/thoughts/${user.id}`);
				if (!res.ok) throw new Error("Failed to fetch");

				const data = await res.json();
				if (data?.text) setNote(data.text);
			} catch (err) {
				console.error("Fetch error:", err);
			}
		};

		fetchNote();
	}, [user]);

	const handleSave = async () => {
		if (!note.trim()) return;

		try {
			const res = await fetch(`/api/thoughts/${user.id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: note }),
			});

			if (res.ok) {
				setStatus("Note saved!");
			} else {
				const error = await res.json();
				setStatus(`Error: ${error.message}`);
			}
		} catch (err) {
			console.error("Save error:", err);
			setStatus("Error saving note.");
		}
	};

	// Clear the status message after 3 seconds
	useEffect(() => {
		if (status) {
			const timeout = setTimeout(() => {
				setStatus("");
			}, 3000); // 3 seconds

			return () => clearTimeout(timeout);
		}
	}, [status]);

	if (!user) return null;

	return (
		<div className="bg-lightGrey2 text-baseBlack rounded-xl p-6 shadow-lg w-full">
			<h2 className="text-xl font-semibold mb-4 border-b pb-2">📝 Notepad</h2>
			<textarea
				className="w-full h-36 p-3 rounded-md text-baseBlack text-[16px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenShade resize-none transition"
				placeholder="Type your thoughts here..."
				value={note}
				onChange={(e) => setNote(e.target.value)}
			/>
			<div className="mt-4 flex justify-end">
				<Button
					onClick={handleSave}
					className="bg-greenShade text-baseBlack font-semibold shadow hover:shadow-md transition"
				>
					Save
				</Button>
			</div>
			{status && <p className="text-sm mt-2 text-green-600">{status}</p>}
		</div>
	);
};

export default Thoughts;
