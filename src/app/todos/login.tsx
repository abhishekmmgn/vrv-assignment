import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <ResponsiveDialog
      title="Login"
      trigger={<Button>Login</Button>}
      children={<LoginForm />}
      hasButton={true}
    />
  );
}
