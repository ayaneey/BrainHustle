import React from "react";

export default function ContactPage() {
	return (
		<main className="max-w-3xl mx-auto px-6 py-16">
			{/* Header */}
			<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
				Get in Touch with Us
			</h1>
			<p className="text-center text-gray-600 mb-12">
				Have questions, feedback, or just want to say hi? Drop us a message
				below. We’d love to hear from you!
			</p>

			{/* Contact Form */}
			<form className="bg-white rounded shadow p-6 grid gap-6">
				<div>
					<label
						htmlFor="name"
						className="block text-gray-700 font-medium mb-1"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary transition-colors"
						placeholder="Your Name"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="email"
						className="block text-gray-700 font-medium mb-1"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary transition-colors"
						placeholder="you@example.com"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="message"
						className="block text-gray-700 font-medium mb-1"
					>
						Message
					</label>
					<textarea
						id="message"
						name="message"
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary transition-colors"
						placeholder="Type your message..."
						rows="5"
						required
					></textarea>
				</div>

				<button
					type="submit"
					className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
				>
					Send Message
				</button>
			</form>

			{/* Additional Contact Info */}
			<div className="mt-12 text-center text-gray-500">
				<p>Or reach us at:</p>
				<p className="font-medium">contact@brainhustle.com</p>
			</div>
		</main>
	);
}
