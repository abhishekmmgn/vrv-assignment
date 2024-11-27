import Link from "next/link";
import { IoArrowUp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Titlebar from "@/components/titlebar";

export default function Home() {
	return (
		<>
			<Titlebar title="Instructions" />
			<div className="horizontal-padding vertical-padding text-secondary-foreground space-y-8 max-w-prose md:text-base+">
				<ul className="list-decimal pl-4 space-y-1">
					<li>
						Create a role: Add a name and permissions (Read, Edit, Delete).
					</li>
					<li>
						Create a user using email, default password will be{" "}
						<span className="highlight">password</span>.
					</li>
					<li>Assign the role to the user.</li>
					<li>
						Optionally add <span className="highlight">status</span> (Active,
						Inactive) to the user.
					</li>
					<li>
						Try editing the role/status of the user or the permissions in the
						roles.
					</li>
					<li>
						Open a new incognito windows/another browser tab and check the{" "}
						<span className="highlight">todos</span> page.
					</li>
				</ul>
				<div className="space-y-4 flex flex-col items-center">
					<Button asChild variant="outline">
						<Link href="/admin" className="flex items-center">
							<span>Open Admin dashboard</span>
							<IoArrowUp className="w-5 h-5 rotate-45" />
						</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/todos" className="flex items-center">
							<span>Open Todos</span>
							<IoArrowUp className="w-5 h-5 rotate-45" />
						</Link>
					</Button>
				</div>
			</div>
		</>
	);
}
