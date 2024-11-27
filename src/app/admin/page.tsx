import Titlebar from "@/components/titlebar";
import type { Metadata } from "next";
import UsersTable from "./users-table";
import Roles from "./roles";
import AdminActions from "./actions";

export const metadata: Metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <Titlebar title="Admin Dashboard" actions={<AdminActions />} />
      <main className="horizontal-padding vertical-padding space-y-6">
        <Roles />
        <UsersTable />
      </main>
    </>
  );
}
