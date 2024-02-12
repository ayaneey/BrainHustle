const { createUser } = require("../actions/action");

describe("createUser", () => {
	it("should return an error message if the form data is invalid", async () => {
		const prevState = {};
		const formData = new FormData();
		formData.append("email", "test@example.com");
		formData.append("password", "password123");
		formData.append("name", "");

		const result = await createUser(prevState, formData);

		expect(result).toEqual({ message: " failed to complete" });
	});

	it("should return an error message if the email is already registered", async () => {
		const prevState = {};
		const formData = new FormData();
		formData.append("email", "test@example.com");
		formData.append("password", "password123");
		formData.append("name", "John Doe");

		// Mock the User.findUnique function to return a user
		prisma.User.findUnique = jest
			.fn()
			.mockResolvedValue({ email: "test@example.com" });

		const result = await createUser(prevState, formData);

		expect(result).toEqual({ message: "Email already registered" });
	});

	it("should create a new user and return success message", async () => {
		const prevState = {};
		const formData = new FormData();
		formData.append("email", "test@example.com");
		formData.append("password", "password123");
		formData.append("name", "John Doe");

		// Mock the User.findUnique function to return null
		prisma.User.findUnique = jest.fn().mockResolvedValue(null);

		// Mock the User.create function to return the created user
		prisma.User.create = jest.fn().mockResolvedValue({
			id: 1,
			email: "test@example.com",
			name: "John Doe",
		});

		const result = await createUser(prevState, formData);

		expect(result).toEqual({
			message: "User created successfully",
			user: { id: 1, email: "test@example.com", name: "John Doe" },
		});
	});

	it("should return an error message if something went wrong", async () => {
		const prevState = {};
		const formData = new FormData();
		formData.append("email", "test@example.com");
		formData.append("password", "password123");
		formData.append("name", "John Doe");

		// Mock the User.findUnique function to throw an error
		prisma.User.findUnique = jest
			.fn()
			.mockRejectedValue(new Error("Something went wrong"));

		const result = await createUser(prevState, formData);

		expect(result).toEqual({ message: "Something went wrong" });
	});
});
