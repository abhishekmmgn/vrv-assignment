import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import EditUserForm from "./forms/edit-user-form";
import { UserType } from "@/lib/utils";
import { IoPencil } from "react-icons/io5";
import { getRoles } from "./roles";

export default async function EditUser({ user }: { user: UserType }) {
  const roles = await getRoles();
  return (
    <ResponsiveDialog
      title="Edit User"
      trigger={
        <Button size="icon" variant="secondary" className="bg-transparent">
          <IoPencil className="w-4 h-4" />
        </Button>
      }
      children={<EditUserForm user={user} roles={roles} />}
      hasButton={true}
    />
  );
}
