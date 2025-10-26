import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";

const LoginPage = async () => {
  await requireUnAuth();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoginForm />
    </div>
  );
}

export default LoginPage;