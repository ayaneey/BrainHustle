"use client";

import React, { useEffect, useState } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import jwt from "jsonwebtoken";

export default function ToDoList() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		// Get userId from token
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("token="))
			?.split("=")[1];

		if (token) {
			const decoded = jwt.decode(token);
			setUserId(decoded.userId);
		}
	}, []);

	useEffect(() => {
		if (userId) {
			fetch(`/api/todos/${userId}`)
				.then((res) => res.json())
				.then((data) => {
					if (Array.isArray(data)) {
						setTodos(data);
					} else {
						console.error("Data received is not an array:", data);
						setTodos([]);
					}
				})
				.catch((err) => {
					console.error("Error fetching the to-dos:", err);
					setTodos([]);
				});
		}
	}, [userId]);

	const handleInputChange = (e) => {
		setNewTodo(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (newTodo.trim() && userId) {
			fetch(`/api/todos/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: newTodo }),
			})
				.then((res) => res.json())
				.then((data) => {
					setTodos([...todos, data]);
					setNewTodo("");
				})
				.catch((err) => console.log("Error adding to-do list", err));
		}
	};

	const handleDelete = (index, id) => {
		if (userId) {
			fetch(`/api/todos/${userId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			})
				.then((res) => res.json())
				.then(() => {
					const updatedTodos = todos.filter((_, i) => i !== index);
					setTodos(updatedTodos);
				})
				.catch((err) => console.error("Error deleting to-do list", err));
		}
	};

	if (!userId) {
		return <div>Please log in to view your todos</div>;
	}

	return (
		<div className="w-full">
			<Card className="w-full shadow-2xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[75%] mx-auto my-4">
				<CardHeader className="flex justify-center pb-2 sm:pb-4">
					<h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
						To-Do List
					</h1>
				</CardHeader>
				<CardBody className="py-2 px-3 sm:px-4 md:px-6">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 text-black"
					>
						<Input
							type="text"
							value={newTodo}
							onChange={handleInputChange}
							placeholder="Enter a new task"
							className="flex-grow"
							size="sm"
							fullWidth
						/>
						<Button
							color="primary"
							type="submit"
							size="sm"
							className="md:w-auto"
						>
							Add
						</Button>
					</form>
					{todos.length > 0 ? (
						<ul className="space-y-2">
							{todos.map((todo, index) => (
								<li
									key={index}
									className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-100 p-2 md:p-3 rounded-md"
								>
									<span className="text-xs sm:text-sm md:text-base mb-2 md:mb-0">
										{todo.text}
									</span>
									<Button
										color="danger"
										size="sm"
										onClick={() => handleDelete(index, todo.id)}
										className="self-end md:self-auto"
									>
										Delete
									</Button>
								</li>
							))}
						</ul>
					) : (
						<p>No todos yet</p>
					)}
				</CardBody>
			</Card>
		</div>
	);
}
