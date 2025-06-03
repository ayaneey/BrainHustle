import React from "react";
import Link from "next/link";

function Footer() {
	return (
		<footer className="">
			<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<a
						href="https://flowbite.com/"
						className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
					>
						<img
							src="./images/brain-hustle.svg"
							className="h-8"
							alt="brain-hustle-logo"
						/>
					</a>
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
						<li className="mr-4">
							<Link href="/about" className="hover:underline">
								About
							</Link>
						</li>
						<li className="mr-4">
							<Link href="/privacy-policy" className="hover:underline">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link href="/contact" className="hover:underline">
								Contact
							</Link>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© 2023{" "}
					<a href="https://flowbite.com/" className="hover:underline">
						BrainHustle™
					</a>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
}

export default Footer;
