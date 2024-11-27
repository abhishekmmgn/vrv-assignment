import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import CreateTodoForm from "./create-todo-form";

export default function CreateTodo() {
  return (
    <ResponsiveDialog
      title="Create Todo"
      trigger={<Button variant="secondary">Create a Todo</Button>}
      children={<CreateTodoForm />}
      hasButton={true}
    />
  );
}
