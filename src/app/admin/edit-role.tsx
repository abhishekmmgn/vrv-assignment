import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import EditRoleForm from "./forms/edit-role-form";
import { RoleType } from "@/lib/utils";

export default function EditRole({ roles }: { roles: RoleType[] }) {
  return (
    <ResponsiveDialog
      title="Edit Role"
      trigger={<Button variant="secondary">Edit a role</Button>}
      children={<EditRoleForm roles={roles} />}
      hasButton={true}
    />
  );
}
