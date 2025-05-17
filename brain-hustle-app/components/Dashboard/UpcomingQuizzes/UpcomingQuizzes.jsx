import React from "react";

const quizzes = [
	{ title: "Maths Quiz: Algebra", due: "May 19, 2025" },
	{ title: "Biology Test: Cells", due: "May 22, 2025" },
];

const UpcomingQuizzes = () => {
	return (
		<div>
			<div className="bg-white rounded-xl p-6 shadow-lg text-base text-baseBlack">
				<h2 className="text-lg font-bold mb-4 border-b pb-2">
					📌 Upcoming Quizzes
				</h2>
				<ul className="space-y-3">
					{quizzes.map((quiz, index) => (
						<li key={index} className="border-l-4 border-greenShade pl-3">
							<p className="font-semibold">{quiz.title}</p>
							<p className="text-sm text-secondTextColor">Due: {quiz.due}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default UpcomingQuizzes;
