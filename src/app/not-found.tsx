import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Not Found",
};

export default function NotFoundPage() {
	return (
		<div className="w-full h-[70vh] grid place-items-center">
			<div className="text-center grid gap-y-3">
				<h1 className="leading-tight text-4xl font-semibold lg:text-5xl">
					Not Found
				</h1>
				<p className="text-secondary-foreground">
					Could not find the requested resource.
				</p>
				<Link href="/" className="mt-3 text-primary">
					Return Home
				</Link>
			</div>
		</div>
	);
}
