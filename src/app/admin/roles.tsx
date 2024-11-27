import SectionWrapper from "@/components/section-wrapper";
import { RoleType } from "@/lib/utils";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

export async function getRoles() {
  const roles: Array<RoleType> = [];

  const q = query(collection(db, "roles"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const { name, permissions } = doc.data();
    roles.push({ name, permissions });
  });
  return roles;
}

export default async function Roles() {
  const roles = await getRoles();
  return (
    <SectionWrapper title="Roles">
      <div className="p-5 bg-secondary rounded-md grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.name} className="capitalize flex items-center gap-2">
            <p className="font-medium">{role.name} — </p>
            {role.permissions?.map((permission, index) => (
              <p key={permission} className="text-muted-foreground text-sm">
                {permission.toLowerCase()}
                {index !== role.permissions.length - 1 && ", "}
              </p>
            ))}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
