import React from "react";
import Button from "../../app/common/components/Button";

function Product() {
	return (
		<div className="container my-12 mx-auto px-4 md:px-12 mb-14">
			<h1 className=" text-center text-4xl mb-12 font-semibold font-raleway-700 text-base-black">
				Your journey to success begins with us
			</h1>
			<div className="flex flex-wrap -mx-1 lg:-mx-4">
				<div className="my-1 px-1 w-full sm:w-1/2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
					<article className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
						<a href="#">
							<img
								alt="Placeholder"
								className="block h-48 sm:h-64 w-full object-cover object-center"
								src="https://www.healthstream.com/images/default-source/blog/01563546_im_cr_blog-images_608x320_final_artboard-2.png?sfvrsn=4360dd29_0"
							/>
						</a>
						<header className="flex items-center justify-between leading-tight p-2 md:p-4">
							<h1 className="text-lg">
								<a className="no-underline text-black" href="#">
									Dive into engaging lessons and interactive quizzes that make
									studying a breeze.
								</a>
							</h1>
						</header>
						<footer className="flex items-center justify-between leading-none p-2 md:p-4"></footer>
					</article>
				</div>

				<div className="my-1 px-1 w-full sm:w-1/2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
					<article className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
						<a href="#">
							<img
								alt="Placeholder"
								className="block h-48 sm:h-64 w-full object-cover object-center"
								src="https://cdn.bocatutor.me/icons/tutor-icon-set/a-plus-test.png"
							/>
						</a>
						<header className="flex items-center justify-between leading-tight p-2 md:p-4">
							<h1 className="text-lg">
								<a className="no-underline hover:underline text-black" href="#">
									Ace your exams with our comprehensive exam prep materials and
									practice tests.
								</a>
							</h1>
						</header>
						<footer className="flex items-center justify-between leading-none p-2 md:p-4"></footer>
					</article>
				</div>

				<div className="my-1 px-1 w-full sm:w-1/2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
					<article className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
						<a href="#">
							<img
								alt="Placeholder"
								className="block h-48 sm:h-64 w-full object-cover object-center"
								src="https://cdn-icons-png.flaticon.com/512/1071/1071531.png"
							/>
						</a>
						<header className="flex items-center justify-between leading-tight p-2 md:p-4">
							<h1 className="text-lg">
								<a className="no-underline hover:underline text-black" href="#">
									Join a vibrant community of students, exchange tips, and
									collaborate on study projects.
								</a>
							</h1>
						</header>
						<footer className="flex items-center justify-between leading-none p-2 md:p-4"></footer>
					</article>
				</div>
			</div>
			<div className=" mt-10">
				<Button title="Try for yourself" />
			</div>
		</div>
	);
}

export default Product;
