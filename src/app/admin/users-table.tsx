import SectionWrapper from "@/components/section-wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { UserType } from "@/lib/utils";
import EditUser from "./edit-user";

export default async function UsersTable() {
  const users: Array<UserType> = [];

  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const { name, email, role, status } = doc.data();
    users.push({ name, email, role, status, id: doc.id });
  });
  return (
    <SectionWrapper title="Users">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden xs:table-cell">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className={`${
                user.status === "INACTIVE" && "text-muted-foreground"
              }`}
            >
              <TableCell className="hidden xs:table-cell capitalize">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>
              <TableCell className="capitalize">
                {user.status.toLowerCase()}
              </TableCell>
              <TableCell>
                <EditUser user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionWrapper>
  );
}
