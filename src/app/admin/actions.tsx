import CreateUser from "./create-user";
import CreateRole from "./create-role";
import { getRoles } from "./roles";
import EditRole from "./edit-role";

export default async function AdminActions() {
  const roles = await getRoles();
  return (
    <>
      <CreateUser roles={roles} />
      <CreateRole />
      {roles.length > 0 && <EditRole roles={roles} />}
    </>
  );
}
