"use client";

import React, { useEffect, useState } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import jwt from "jsonwebtoken";

export default function ToDoList() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [userId, setUserId] = useState(null);

	/****** This section is the AUTHENTICATION CHECK: It checks for user login status ******/
	useEffect(() => {
		// Get all cookies from browser
		const token = document.cookie
			// Split cookies into array at semicolon+space
			.split("; ")
			// Find cookie that starts with "token="
			.find((row) => row.startsWith("token="))
			// Split found cookie at "=" and take second part (the value)
			?.split("=")[1];

		// If token found
		if (token) {
			// Decode JWT token to get user information
			const decoded = jwt.decode(token);
			// Save user ID from token to state
			setUserId(decoded.userId);
		}
		// Empty array means run once when component mounts
	}, []);

	/* ***************************************************************** */

	/****** This section is the FETCH USER DATA: Gets User's Todos ******/
	useEffect(() => {
		// This 'if' means only proceed if we have a user ID (meaning someone is logged in)
		if (userId) {
			// Start the request 'fetch' to get todos from our database
			fetch(`/api/todos/${userId}`) // The ${userId} makes sure we only get THIS user's todos
				.then((res) => res.json()) // When we get the response, convert it from string format to JSON format
				// Now that we have the data in a format we can use...
				.then((data) => {
					// Check if what we got back is an array (a list of todos)
					// Arrays are what we expect since todos should be a list
					if (Array.isArray(data)) {
						// If it is an array, save these todos in our component's state
						// This will make them show up on the screen
						setTodos(data);
					} else {
						// If it's not an array, something went wrong
						// Log the error so we can debug it
						console.error("Data received is not an array:", data);
						// Set todos to empty array so our component doesn't break
						setTodos([]);
					}
				})
				// If anything goes wrong during this process (like network error)
				.catch((err) => {
					// Log the error so we can see what went wrong
					console.error("Error fetching the to-dos:", err);
					// Set todos to empty array as a fallback
					// This prevents our component from breaking
					setTodos([]);
				});
		}
	}, [userId]); // This userId 're-fetches' todos whenever user login changes i.e. another user logs in, so it fetches THAT specific user's todos

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

/* Explaining the AUTHENTICATION useEffect() hook */
/* When page loads: 1. Find login from token 2. Get user ID from token 3. Save user ID for later use */

/* Explaining the FETCH USER DATA useEffect() hook */
/* When we have user Id */
