import { SignupForm } from "@/features/auth/components/signup-form";
import { requireUnAuth } from "@/lib/auth-utils";

const SignupPage = async () => {
  await requireUnAuth();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignupForm />
    </div>
  );
}

export default SignupPage;