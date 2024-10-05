import React, { useEffect, useState } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";

/* NOTE */
//setTodos: A function to update the todos array.
//setNewTodo: A function to update the newTodo value as the user types.

export default function ToDoList() {
	const [todos, setTodos] = useState([]); // List of to-do items (starts empty)
	const [newTodo, setNewTodo] = useState(""); // Input text (starts empty)

	/* Fetching existing to-do items from the API when the component loads (GET request)*/
	useEffect(() => {
		fetch("/api/todolist")
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setTodos(data);
				} else {
					console.error("Data received is not an array:", data);
					setTodos([]); // Set to empty array if data is not an array
				}
			})
			.catch((err) => {
				console.error("Error fetching the to-dos:", err);
				setTodos([]); // Set to empty array on error
			});
	}, []);

	// Runs when the user types in the input
	const handleInputChange = (e) => {
		setNewTodo(e.target.value); // Updates the input value with what the user types
	};

	/******** Function to Handle ADDING New To-Do to the List ********/
	// This function adds a new to-do item to the database (POST request) and updates the list in the UI.

	const handleSubmit = (e) => {
		e.preventDefault(); // Stop the page from refreshing

		if (newTodo.trim()) {
			// we need a fetch request: adding a new task to database (POST)
			fetch("/api/todolist", {
				method: "POST", // Fix: method should be a string
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: newTodo }), // this sends the new to-do text to the API
			})
				.then((res) => res.json())
				.then((data) => {
					setTodos([...todos, data]); // This adds the new to-do to the list from the database
					setNewTodo(""); // this clears the input field
				})
				.catch((err) => console.log("Error adding to-do list", err)); // Fix: place catch inside the chain
		}
	};

	/****************************************************************************************/

	/******** Function to Handle DELETING a To-Do Item ********/
	// This function deletes a to-do item from the database (DELETE request) and updates the list in the UI

	const handleDelete = (index, id) => {
		// Remove the to-do from the database (DELETE request)
		fetch("/api/todolist", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		})
			.then((res) => res.json())
			.then(() => {
				const updatedTodos = todos.filter((_, i) => i !== index); // This removes the to-do from the UI
				setTodos(updatedTodos);
			})
			.catch((err) => console.error("Error deleting to-do list", err));
	};

	/* UI */
	return (
		<Card className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[45%] mx-auto mt-4 sm:mt-6 md:mt-8">
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
					<Button color="primary" type="submit" size="sm" className="md:w-auto">
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
					<p>Loading...</p>
				)}
			</CardBody>
		</Card>
	);
}
