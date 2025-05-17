"use client";

import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";

export default function ToDoList() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [status, setStatus] = useState("");
	const { user, isLoaded } = useUser();

	useEffect(() => {
		if (!isLoaded || !user) return;

		const fetchTodos = async () => {
			try {
				const res = await fetch(`/api/todos/${user.id}`);
				if (!res.ok) throw new Error("Failed to fetch todos");
				const data = await res.json();
				setTodos(Array.isArray(data) ? data : []);
			} catch (err) {
				console.error("Fetch error:", err);
				setTodos([]);
			}
		};

		fetchTodos();
	}, [isLoaded, user]);

	const handleAddTodo = async (e) => {
		e.preventDefault();
		if (!newTodo.trim()) return;

		try {
			const res = await fetch(`/api/todos/${user.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: newTodo }),
			});

			const data = await res.json();
			if (res.ok) {
				setTodos((prev) => [...prev, data]);
				setNewTodo("");
				setStatus("Task added!");
			} else {
				console.error("Add error:", data.message);
			}
		} catch (err) {
			console.error("Error adding todo:", err);
		}
	};

	const handleDelete = async (id) => {
		try {
			const res = await fetch(`/api/todos/${user.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});

			if (res.ok) {
				setTodos((prev) => prev.filter((todo) => todo.id !== id));
				setStatus("Task removed.");
			} else {
				console.error("Failed to delete");
			}
		} catch (err) {
			console.error("Delete error:", err);
		}
	};

	if (!isLoaded) return <p>Loading...</p>;
	if (!user) return <p>Please log in to view your tasks.</p>;

	return (
		<div className="bg-lightTeal text-white rounded-lg p-6 shadow-md w-full">
			<h2 className="text-xl font-semibold mb-4">📋 To-Do List</h2>

			<form
				onSubmit={handleAddTodo}
				className="flex flex-col md:flex-row gap-2 mb-4 text-black"
			>
				<Input
					type="text"
					placeholder="Enter a new task"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					className="flex-1"
					size="sm"
				/>
				<Button type="submit" className="bg-greenShade text-black font-medium">
					Add
				</Button>
			</form>

			{todos.length > 0 ? (
				<ul className="space-y-3">
					{todos.map((todo) => (
						<li
							key={todo.id}
							className="flex justify-between items-center bg-white/80 text-black rounded-md px-4 py-2 shadow-sm"
						>
							<span className="text-sm">{todo.text}</span>
							<button
								onClick={() => handleDelete(todo.id)}
								className="text-lightOrange text-sm font-medium hover:bg-baseBlack hover:text-white px-3 py-1 rounded-full transition-colors"
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="text-sm text-gray-300">No tasks yet.</p>
			)}

			{status && <p className="mt-2 text-sm text-green-200">{status}</p>}
		</div>
	);
}
