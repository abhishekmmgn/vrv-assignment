import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { RoleType } from "@/lib/utils";
import CreateUserForm from "./forms/create-user-form";

export default function EditRole({ roles }: { roles: RoleType[] }) {
  return (
    <ResponsiveDialog
      title="Create user"
      trigger={<Button>Create a user</Button>}
      children={<CreateUserForm roles={roles} />}
      hasButton={true}
    />
  );
}
