import React, { useState, useEffect } from "react";

const Today = () => {
	// State to store the note
	const [note, setNote] = useState("");

	// Effect to load the saved note from localStorage when the component mounts
	useEffect(() => {
		const savedNote = localStorage.getItem("miniNotepadNote");
		if (savedNote) {
			setNote(savedNote);
		}
	}, []);

	// Handler to update note and store it in localStorage
	const handleNoteChange = (event) => {
		setNote(event.target.value);
		localStorage.setItem("miniNotepadNote", event.target.value);
	};

	return (
		<div className="bg-gray-400/50 shadow-lg rounded-lg p-4 w-full h-full max-w-xl">
			<h2 className="text-xl font-bold mb-2">Notepad</h2>
			<textarea
				className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-[18px]"
				placeholder="Type your notes here..."
				value={note}
				onChange={handleNoteChange}
			/>
			<p className="mt-1 text-sm text-gray-500">
				Your notes are saved automatically.
			</p>
		</div>
	);
};

export default Today;
