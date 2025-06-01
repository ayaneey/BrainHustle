"use client";
import React from "react";
import Image from "next/image";
import Button from "../../components/Button/Button";
import Testimonials from "../../components/Testimonials/Testimonials";

export default function Product() {
	return (
		<main className="bg-white text-gray-800">
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary to-secondary text-white py-16 px-6 text-center">
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					Discover Brain Hustle
				</h1>
				<p className="max-w-2xl mx-auto text-lg md:text-xl opacity-90 mb-6">
					Unlock your full academic potential with interactive lessons, exam
					prep, and personalized learning paths.
				</p>
				<Button title="Get Started Today" />
			</section>

			{/* Features Section */}
			<section className="max-w-6xl mx-auto py-16 px-6 grid gap-12 md:grid-cols-3">
				<div className="flex flex-col items-center text-center">
					<Image
						src="/images/book2.svg"
						alt="Interactive Learning"
						width={80}
						height={80}
					/>
					<h2 className="text-xl font-semibold mt-4 mb-2">
						Interactive Learning
					</h2>
					<p className="text-gray-600">
						Engage with lessons, videos, and quizzes that make learning fun and
						effective.
					</p>
				</div>
				<div className="flex flex-col items-center text-center">
					<Image
						src="/images/expert.svg"
						alt="Exam Mastery"
						width={80}
						height={80}
					/>
					<h2 className="text-xl font-semibold mt-4 mb-2">Exam Mastery</h2>
					<p className="text-gray-600">
						Prepare for exams confidently with comprehensive materials and
						practice tests.
					</p>
				</div>
				<div className="flex flex-col items-center text-center">
					<Image
						src="/images/handshake.svg"
						alt="Community Support"
						width={80}
						height={80}
					/>
					<h2 className="text-xl font-semibold mt-4 mb-2">Community Support</h2>
					<p className="text-gray-600">
						Collaborate with like-minded students and share your learning
						journey.
					</p>
				</div>
			</section>

			{/* Selling Points */}
			<section className="bg-gray-50 py-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-4">Why Choose Brain Hustle?</h2>
					<p className="text-gray-600 mb-8">
						Brain Hustle isn’t just another study tool—it’s your partner in
						success. From engaging lessons to a supportive community, we’re here
						to help you achieve your best.
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					<div className="bg-white rounded shadow p-6">
						<h3 className="text-xl font-semibold mb-2">
							Personalized Learning
						</h3>
						<p className="text-gray-600">
							Tailor your study plans to your pace and goals for a truly
							customized experience.
						</p>
					</div>
					<div className="bg-white rounded shadow p-6">
						<h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
						<p className="text-gray-600">
							Measure your growth and identify strengths to boost confidence and
							mastery.
						</p>
					</div>
					<div className="bg-white rounded shadow p-6">
						<h3 className="text-xl font-semibold mb-2">Expert Resources</h3>
						<p className="text-gray-600">
							Access GCSE-specific resources designed by educators and exam
							experts.
						</p>
					</div>
					<div className="bg-white rounded shadow p-6">
						<h3 className="text-xl font-semibold mb-2">Engaging Experience</h3>
						<p className="text-gray-600">
							Our interactive design ensures you stay motivated and never feel
							alone on your journey.
						</p>
					</div>
				</div>
				<div className="text-center mt-10">
					<Button title="Join the Community" />
				</div>
			</section>

			{/* Testimonials */}
			<section className="max-w-6xl mx-auto py-16 px-6">
				<h2 className="text-3xl font-bold text-center mb-10">
					What Our Students Say
				</h2>
				<Testimonials />
			</section>

			{/* Call to Action */}
			<section className="bg-primary text-white py-16 px-6 text-center">
				<h2 className="text-3xl font-bold mb-4">
					Start Your Journey to Academic Success
				</h2>
				<p className="max-w-2xl mx-auto mb-6 text-lg">
					Join thousands of students achieving their goals with Brain Hustle.
					Let’s hustle smarter—together!
				</p>
				<Button title="Get Started" />
			</section>
		</main>
	);
}
