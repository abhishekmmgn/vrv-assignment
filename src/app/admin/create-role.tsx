import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import CreateRoleForm from "./forms/create-role-form";

export default function CreateRole() {
  return (
    <ResponsiveDialog
      title="Create Role"
      trigger={<Button variant="secondary">Create a role</Button>}
      children={<CreateRoleForm />}
      hasButton={true}
    />
  );
}
