"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="h-[70vh] w-full grid place-items-center">
			<div className="text-center grid gap-y-3">
				<h1 className="leading-tight text-4xl font-semibold lg:text-5xl">
					Something went wrong!
				</h1>
				<p className="text-secondary-foreground">
					Please try refreshing the page if the error persists
				</p>
				<div className="mx-auto mt-3 flex items-center gap-10">
					<p
						className="hover:cursor-pointer text-destructive"
						onClick={() => reset()}
					>
						Try again
					</p>
					<Link href="/" className="text-primary">
						Return Home
					</Link>
				</div>
			</div>
		</div>
	);
}
